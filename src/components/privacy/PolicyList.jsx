import { FaCheck } from 'react-icons/fa';

const PolicyList = ({ items, variant = 'bullet' }) => {
  if (variant === 'numbered') {
    return (
      <ol className="space-y-3 list-decimal list-inside">
        {items.map((item, index) => (
          <li key={index} className="text-policy-text leading-relaxed pl-2">
            {item}
          </li>
        ))}
      </ol>
    );
  }

  if (variant === 'check') {
    return (
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
              <FaCheck className="h-3 w-3 text-[#FF0055]" />
            </div>
            <span className="text-policy-text leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-3 list-disc list-inside marker:text-[#FF0055]">
      {items.map((item, index) => (
        <li key={index} className="text-policy-text leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default PolicyList;