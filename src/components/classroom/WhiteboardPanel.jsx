'use client';

import { useState, useRef, useEffect } from 'react';

export default function WhiteboardPanel({ classroomId }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(3);
    const [shapes, setShapes] = useState([]);
    const [currentShape, setCurrentShape] = useState(null);
    const [ctx, setCtx] = useState(null);

    // تهيئة Canvas
    useEffect(() => {
        const initCanvas = () => {
            if (!canvasRef.current) return;

            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            // تعيين حجم Canvas
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;

            setCtx(context);

            // رسم خلفية بيضاء
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);

            // رسم شبكة خفيفة
            drawGrid(context, canvas.width, canvas.height);

            // تحميل الأشكال المحفوظة
            loadSavedShapes();
        };

        initCanvas();

        // إعادة التهيئة عند تغيير الحجم
        const handleResize = () => {
            initCanvas();
            redrawShapes();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const drawGrid = (context, width, height) => {
        context.strokeStyle = '#F5F5F5';
        context.lineWidth = 1;

        const gridSize = 20;

        // خطوط عمودية
        for (let x = 0; x <= width; x += gridSize) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
        }

        // خطوط أفقية
        for (let y = 0; y <= height; y += gridSize) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.stroke();
        }
    };

    const loadSavedShapes = () => {
        try {
            const saved = localStorage.getItem(`whiteboard_${classroomId}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                setShapes(parsed);
            }
        } catch (error) {
            console.error('Error loading shapes:', error);
        }
    };

    const saveShapes = () => {
        try {
            localStorage.setItem(`whiteboard_${classroomId}`, JSON.stringify(shapes));
        } catch (error) {
            console.error('Error saving shapes:', error);
        }
    };

    const redrawShapes = () => {
        if (!ctx || !canvasRef.current) return;

        // مسح Canvas
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // رسم الشبكة
        drawGrid(ctx, canvasRef.current.width, canvasRef.current.height);

        // رسم جميع الأشكال
        shapes.forEach(shape => {
            drawShape(shape);
        });
    };

    const drawShape = (shape) => {
        if (!ctx) return;

        ctx.save();

        // إعدادات الرسم
        ctx.strokeStyle = shape.color;
        ctx.fillStyle = shape.fillColor || 'transparent';
        ctx.lineWidth = shape.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (shape.type === 'pen' || shape.type === 'eraser') {
            drawFreehand(shape);
        } else if (shape.type === 'line') {
            drawLine(shape);
        } else if (shape.type === 'rectangle') {
            drawRectangle(shape);
        } else if (shape.type === 'circle') {
            drawCircle(shape);
        }

        ctx.restore();
    };

    const drawFreehand = (shape) => {
        if (!shape.points || shape.points.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(shape.points[0].x, shape.points[0].y);

        for (let i = 1; i < shape.points.length; i++) {
            ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }

        ctx.stroke();
    };

    const drawLine = (shape) => {
        ctx.beginPath();
        ctx.moveTo(shape.start.x, shape.start.y);
        ctx.lineTo(shape.end.x, shape.end.y);
        ctx.stroke();
    };

    const drawRectangle = (shape) => {
        const width = shape.end.x - shape.start.x;
        const height = shape.end.y - shape.start.y;

        if (shape.fillColor && shape.fillColor !== 'transparent') {
            ctx.fillRect(shape.start.x, shape.start.y, width, height);
        }

        ctx.strokeRect(shape.start.x, shape.start.y, width, height);
    };

    const drawCircle = (shape) => {
        const radius = Math.sqrt(
            Math.pow(shape.end.x - shape.start.x, 2) +
            Math.pow(shape.end.y - shape.start.y, 2)
        );

        ctx.beginPath();
        ctx.arc(shape.start.x, shape.start.y, radius, 0, 2 * Math.PI);

        if (shape.fillColor && shape.fillColor !== 'transparent') {
            ctx.fill();
        }

        ctx.stroke();
    };

    const getMousePosition = (e) => {
        if (!canvasRef.current) return { x: 0, y: 0 };

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseDown = (e) => {
        const pos = getMousePosition(e);

        setIsDrawing(true);

        const newShape = {
            type: tool === 'eraser' ? 'eraser' : tool,
            color: tool === 'eraser' ? '#FFFFFF' : color,
            size: brushSize,
            start: pos,
            end: pos,
            points: [pos],
            fillColor: tool === 'rectangle' || tool === 'circle' ? `${color}33` : 'transparent'
        };

        setCurrentShape(newShape);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing || !currentShape) return;

        const pos = getMousePosition(e);

        const updatedShape = {
            ...currentShape,
            end: pos,
            points: [...currentShape.points, pos]
        };

        setCurrentShape(updatedShape);

        // رسم مباشر
        if (ctx) {
            redrawShapes();
            drawShape(updatedShape);
        }
    };

    const handleMouseUp = () => {
        if (!isDrawing || !currentShape) return;

        setIsDrawing(false);

        // إضافة الشكل النهائي للقائمة
        const finalShape = {
            ...currentShape,
            id: Date.now()
        };

        setShapes(prev => [...prev, finalShape]);
        setCurrentShape(null);

        // حفظ الأشكال
        saveShapes();
    };

    const clearCanvas = () => {
        if (ctx && canvasRef.current) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawGrid(ctx, canvasRef.current.width, canvasRef.current.height);
            setShapes([]);
            localStorage.removeItem(`whiteboard_${classroomId}`);
        }
    };

    const tools = [
        { id: 'pen', label: 'قلم', icon: '✏️' },
        { id: 'line', label: 'خط', icon: '📏' },
        { id: 'rectangle', label: 'مستطيل', icon: '⬜' },
        { id: 'circle', label: 'دائرة', icon: '⭕' },
        { id: 'eraser', label: 'ممحاة', icon: '🧽' }
    ];

    const colors = [
        '#000000', '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'
    ];

    const brushSizes = [1, 3, 5, 10, 20];

    return (
        <div className="h-full flex flex-col bg-white border border-gray-300 rounded-lg">
            {/* أدوات الرسم */}
            <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                <div className="flex items-center space-x-4 space-x-reverse">
                    {/* الأدوات */}
                    <div className="flex space-x-2 space-x-reverse">
                        {tools.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTool(t.id)}
                                className={`p-2 rounded-lg ${tool === t.id
                                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                                    }`}
                                title={t.label}
                            >
                                <span className="text-lg">{t.icon}</span>
                            </button>
                        ))}
                    </div>

                    {/* الألوان */}
                    <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-sm text-gray-600">اللون:</span>
                        <div className="flex space-x-1 space-x-reverse">
                            {colors.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-gray-800' : 'border-gray-300'
                                        }`}
                                    style={{ backgroundColor: c }}
                                    title={c}
                                />
                            ))}
                        </div>
                    </div>

                    {/* حجم الفرشاة */}
                    <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-sm text-gray-600">الحجم:</span>
                        <select
                            value={brushSize}
                            onChange={(e) => setBrushSize(parseInt(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1"
                        >
                            {brushSizes.map(size => (
                                <option key={size} value={size}>{size}px</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* أزرار التحكم */}
                <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                        onClick={clearCanvas}
                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                    >
                        🗑️ مسح الكل
                    </button>
                    <button
                        onClick={() => {
                            if (canvasRef.current) {
                                const link = document.createElement('a');
                                link.download = `whiteboard-${Date.now()}.png`;
                                link.href = canvasRef.current.toDataURL();
                                link.click();
                            }
                        }}
                        className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                    >
                        💾 حفظ
                    </button>
                </div>
            </div>

            {/* لوحة الرسم */}
            <div className="flex-1 relative overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full cursor-crosshair"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                />

                {/* معلومات المساعدة */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-sm">
                    اضغط واسحب للرسم | Alt+Click للمسح
                </div>
            </div>

            {/* معلومات الحالة */}
            <div className="border-t p-2 bg-gray-50">
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>
                        الأداة: <span className="font-semibold">
                            {tool === 'pen' ? 'قلم' :
                                tool === 'line' ? 'خط' :
                                    tool === 'rectangle' ? 'مستطيل' :
                                        tool === 'circle' ? 'دائرة' : 'ممحاة'}
                        </span>
                    </div>
                    <div>
                        الأشكال: <span className="font-semibold">{shapes.length}</span>
                    </div>
                    <div>
                        اللون: <span className="font-semibold">{color}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}