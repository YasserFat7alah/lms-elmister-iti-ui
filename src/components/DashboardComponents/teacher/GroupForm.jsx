export default function GroupForm({ group, index, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            اسم المجموعة *
          </label>
          <input
            type="text"
            value={group.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="مثال: المجموعة الصباحية"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الجدول الزمني *
          </label>
          <input
            type="text"
            value={group.schedule}
            onChange={(e) => onChange(index, 'schedule', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="مثال: السبت، الإثنين - 10 صباحاً"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ البدء *
            </label>
            <input
              type="date"
              value={group.startDate}
              onChange={(e) => onChange(index, 'startDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ الانتهاء *
            </label>
            <input
              type="date"
              value={group.endDate}
              onChange={(e) => onChange(index, 'endDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            نوع المكان
          </label>
          <div className="flex space-x-4 rtl:space-x-reverse mb-3">
            <label className="flex items-center">
              <input
                type="radio"
                name={`locationType-${index}`}
                value="online"
                checked={group.locationType === 'online'}
                onChange={(e) => onChange(index, 'locationType', e.target.value)}
                className="ml-2"
              />
              <span className="text-gray-700">أونلاين</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name={`locationType-${index}`}
                value="offline"
                checked={group.locationType === 'offline'}
                onChange={(e) => onChange(index, 'locationType', e.target.value)}
                className="ml-2"
              />
              <span className="text-gray-700">أوفلاين</span>
            </label>
          </div>

          <input
            type="text"
            value={group.location}
            onChange={(e) => onChange(index, 'location', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder={
              group.locationType === 'online' 
                ? 'رابط الاجتماع (زووم، جوجل ميت، إلخ)' 
                : 'العنوان التفصيلي'
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            عدد الحصص *
          </label>
          <input
            type="number"
            value={group.sessionsCount}
            onChange={(e) => onChange(index, 'sessionsCount', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            min="1"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            السعر (جنيه) *
          </label>
          <input
            type="number"
            value={group.price}
            onChange={(e) => onChange(index, 'price', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الحد الأقصى للطلاب
          </label>
          <input
            type="number"
            value={group.maxStudents}
            onChange={(e) => onChange(index, 'maxStudents', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            حالة المجموعة
          </label>
          <select
            value={group.status}
            onChange={(e) => onChange(index, 'status', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="draft">مسودة</option>
            <option value="active">نشط</option>
            <option value="full">مكتمل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>
    </div>
  );
}