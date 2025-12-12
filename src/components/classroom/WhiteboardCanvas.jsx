'use client';

import { forwardRef, useState, useEffect, useImperativeHandle, useRef } from 'react';

const WhiteboardCanvas = forwardRef(({
    tool = 'pen',
    color = '#000000',
    brushSize = 3,
    collaborativeUsers = [],
    isCollaborative = false
}, ref) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPoint, setLastPoint] = useState(null);
    const [shapes, setShapes] = useState([]);
    const [currentShape, setCurrentShape] = useState(null);
    const [userCursors, setUserCursors] = useState({});
    const [ctx, setCtx] = useState(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    // تعريض الدوال للعنصر الرئيسي
    useImperativeHandle(ref, () => ({
        clear: () => {
            clearCanvas();
        },
        toDataURL: (format = 'image/png') => {
            return canvasRef.current ? canvasRef.current.toDataURL(format) : '';
        },
        getContext: () => ctx,
        saveImage: () => {
            if (canvasRef.current) {
                const link = document.createElement('a');
                link.download = `whiteboard-${Date.now()}.png`;
                link.href = canvasRef.current.toDataURL();
                link.click();
            }
        }
    }));

    // تهيئة Canvas عند التحميل
    useEffect(() => {
        const initCanvas = () => {
            if (!canvasRef.current) return;

            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            // تعيين حجم Canvas
            const width = canvas.parentElement.clientWidth;
            const height = canvas.parentElement.clientHeight;

            canvas.width = width;
            canvas.height = height;

            setCanvasSize({ width, height });
            setCtx(context);

            // رسم الخلفية البيضاء
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, width, height);

            // رسم شبكة خلفية (اختياري)
            drawGrid(context, width, height);

            // تحميل الأشكال المحفوظة
            loadSavedShapes();
        };

        initCanvas();
        window.addEventListener('resize', initCanvas);

        // محاكاة المستخدمين المتعاونين
        let collaborationInterval;
        if (isCollaborative && collaborativeUsers.length > 0) {
            collaborationInterval = setInterval(() => {
                simulateCollaborativeCursors();
            }, 3000);
        }

        return () => {
            window.removeEventListener('resize', initCanvas);
            if (collaborationInterval) clearInterval(collaborationInterval);
        };
    }, [isCollaborative, collaborativeUsers]);

    // إعادة الرسم عند تغيير الأشكال
    useEffect(() => {
        if (ctx && canvasSize.width > 0 && canvasSize.height > 0) {
            redrawCanvas();
        }
    }, [shapes, currentShape, userCursors]);

    const drawGrid = (context, width, height) => {
        context.strokeStyle = '#F0F0F0';
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

    const clearCanvas = () => {
        if (ctx && canvasRef.current) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawGrid(ctx, canvasRef.current.width, canvasRef.current.height);
            setShapes([]);
            setCurrentShape(null);
            localStorage.removeItem('whiteboard_shapes');
        }
    };

    const loadSavedShapes = () => {
        try {
            const saved = localStorage.getItem('whiteboard_shapes');
            if (saved) {
                const parsed = JSON.parse(saved);
                setShapes(parsed);
            }
        } catch (error) {
            console.error('Error loading saved shapes:', error);
        }
    };

    const saveShapes = () => {
        try {
            localStorage.setItem('whiteboard_shapes', JSON.stringify(shapes));
        } catch (error) {
            console.error('Error saving shapes:', error);
        }
    };

    const redrawCanvas = () => {
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

        // رسم الشكل الحالي
        if (currentShape) {
            drawShape(currentShape);
        }

        // رسم مؤشرات المستخدمين
        Object.values(userCursors).forEach(cursor => {
            drawUserCursor(cursor);
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
        ctx.globalAlpha = shape.opacity || 1;

        switch (shape.type) {
            case 'pen':
                drawFreehand(shape);
                break;
            case 'line':
                drawStraightLine(shape);
                break;
            case 'rectangle':
                drawRectangle(shape);
                break;
            case 'circle':
                drawCircle(shape);
                break;
            case 'text':
                drawText(shape);
                break;
            case 'eraser':
                drawEraser(shape);
                break;
            default:
                drawFreehand(shape);
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

    const drawStraightLine = (shape) => {
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

    const drawText = (shape) => {
        if (!shape.text) return;

        ctx.font = `${shape.size * 4}px Arial`;
        ctx.fillStyle = shape.color;
        ctx.textAlign = 'start';
        ctx.fillText(shape.text, shape.start.x, shape.start.y);
    };

    const drawEraser = (shape) => {
        if (!shape.points || shape.points.length < 2) return;

        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = shape.size;
        ctx.strokeStyle = 'rgba(0,0,0,1)';

        ctx.beginPath();
        ctx.moveTo(shape.points[0].x, shape.points[0].y);

        for (let i = 1; i < shape.points.length; i++) {
            ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }

        ctx.stroke();
        ctx.restore();
    };

    const drawUserCursor = (cursor) => {
        if (!ctx) return;

        ctx.save();

        // رسم دائرة المؤشر
        ctx.fillStyle = cursor.color;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, 8, 0, 2 * Math.PI);
        ctx.fill();

        // رسم حدود المؤشر
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        // كتابة الاسم
        ctx.fillStyle = cursor.color;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(cursor.name, cursor.x, cursor.y - 15);

        ctx.restore();
    };

    const simulateCollaborativeCursors = () => {
        if (!canvasRef.current || !isCollaborative) return;

        const canvas = canvasRef.current;
        const newCursors = {};

        collaborativeUsers.forEach(user => {
            newCursors[user.id] = {
                ...user,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                name: user.name.split(' ')[0] // الاسم الأول فقط
            };
        });

        setUserCursors(newCursors);
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
        setLastPoint(pos);

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
        setLastPoint(pos);
    };

    const handleMouseUp = () => {
        if (!isDrawing || !currentShape) return;

        setIsDrawing(false);

        // إضافة الشكل النهائي للقائمة
        const finalShape = {
            ...currentShape,
            id: Date.now() + Math.random()
        };

        setShapes(prev => [...prev, finalShape]);
        setCurrentShape(null);
        setLastPoint(null);

        // حفظ الأشكال
        saveShapes();
    };

    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full cursor-crosshair bg-white border border-gray-300 rounded-lg"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            />

            {/* معلومات Canvas */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                <div>الأداة: {tool === 'pen' ? 'قلم' : tool === 'line' ? 'خط' : tool === 'rectangle' ? 'مستطيل' : tool === 'circle' ? 'دائرة' : tool === 'text' ? 'نص' : 'ممحاة'}</div>
                <div>الحجم: {brushSize}px</div>
                <div>الأشكال: {shapes.length}</div>
            </div>

            {/* أزرار التحكم */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                    onClick={clearCanvas}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow"
                    title="مسح الكل"
                >
                    🗑️
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
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow"
                    title="حفظ كصورة"
                >
                    💾
                </button>
            </div>
        </div>
    );
});

WhiteboardCanvas.displayName = 'WhiteboardCanvas';

export default WhiteboardCanvas;