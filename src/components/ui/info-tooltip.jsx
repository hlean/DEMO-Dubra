import { HelpCircle } from 'lucide-react';
import React from 'react';

const InfoTooltip = ({ children, widthClass = '', positionClass = 'top-6 right-0' }) => {
  return (
    <div className="relative group">
      <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer" />
      <div className={`absolute z-10 ${widthClass} max-w-xs min-w-max p-3 bg-black text-white text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 ${positionClass}`}>
        {children}
      </div>
    </div>
  );
};



export default InfoTooltip;
