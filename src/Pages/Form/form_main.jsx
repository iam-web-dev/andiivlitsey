import React, { useState } from 'react';
import './style.css'; // Bu faylni yarating va quyidagi CSS ni qo'shing

const Form_main = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+998 ',
    age: '14',
    parentPhone: '+998 ',
    direction: 'axborot',
    language: 'uzbek',
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters except the initial +
    const isPlus = value.startsWith('+');
    const digits = value.replace(/\D/g, '');

    // Ensure starts with 998
    let phoneDigits = digits;
    if (!phoneDigits.startsWith('998')) {
      phoneDigits = '998' + phoneDigits;
    }
    phoneDigits = phoneDigits.slice(0, 12); // Limit to 12 digits (998 + 9)

    // Build formatted string
    let formatted = '+';
    if (phoneDigits.length > 0) {
      formatted += phoneDigits.slice(0, 3);
    }
    if (phoneDigits.length > 3) {
      formatted += ' (' + phoneDigits.slice(3, 5);
    }
    if (phoneDigits.length > 5) {
      formatted += ') ' + phoneDigits.slice(5, 8);
    }
    if (phoneDigits.length > 8) {
      formatted += ' ' + phoneDigits.slice(8, 10);
    }
    if (phoneDigits.length > 10) {
      formatted += ' ' + phoneDigits.slice(10);
    }
    return formatted;
  };

  const handleChange = (e) => {
    let { id, value } = e.target;
    if (id === 'phone' || id === 'parentPhone') {
      value = formatPhoneNumber(value);
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 12) {
      newErrors.phone = "To'g'ri telefon raqamini kiriting (to'liq 9 ta raqam)";
    }

    const parentPhoneDigits = formData.parentPhone.replace(/\D/g, '');
    if (parentPhoneDigits.length !== 12) {
      newErrors.parentPhone = "To'g'ri ota-ona telefon raqamini kiriting (to'liq 9 ta raqam)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus(null);
      return;
    }

    console.log('Form submitted:', formData);
    setSubmitStatus('success');
    setErrors({});
  };

  return (
    <div className='w-full h-full flex justify-center bg-[#FFFFFF]'>
      <div className='w-full sm:w-[1220px] h-full flex gap-[20px] pt-[80px] flex-col items-center'>
        <h1 className='font-inter font-[700] text-[36px] text-[#303030]'>Ariza qoldirish</h1>
        
        <form 
          onSubmit={handleSubmit} 
          className='w-full max-w-md p-6 space-y-4'
        >
          {/* Full Name */}
          <div>
            <label htmlFor='fullName' className='block text-[#6F6F6F] font-[400] mb-[10px]'>
              To'liq ism (familiya, ism, otasining ismi)
            </label>
            <input
              type='text'
              id='fullName'
              value={formData.fullName}
              onChange={handleChange}
              className='w-full sm:w-[375px] h-[52px] px-4 border border-[#E0E0E0] bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300 ease-in-out'
              placeholder="Ismingizni kiriting"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor='phone' className='block text-[#6F6F6F] font-[400] mb-[10px]'>
              Telefon raqami
            </label>
            <input
              type='tel'
              id='phone'
              value={formData.phone}
              onChange={handleChange}
              className='w-full sm:w-[375px] h-[52px] px-4 border border-[#E0E0E0] bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300 ease-in-out'
              placeholder='+998 (99) 999 99 99'
              required
            />
            {errors.phone && (
              <p className='text-red-600 text-sm mt-1'>{errors.phone}</p>
            )}
          </div>

          {/* Age Select */}
          <div>
            <label htmlFor='age' className='block text-[#6F6F6F] font-[400] mb-[10px]'>
              Yoshni tanlang
            </label>
            <select
              id='age'
              value={formData.age}
              onChange={handleChange}
              className='custom-select w-full sm:w-[375px] h-[52px] px-4 border border-[#E0E0E0] bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300 ease-in-out'
              required
            >
              <option value='14'>14</option>
              <option value='15'>15</option>
              <option value='16'>16</option>
              {/* Qo'shimcha yoshlar qo'shishingiz mumkin */}
            </select>
          </div>

          {/* Parent Phone Number */}
          <div>
            <label htmlFor='parentPhone' className='block text-[#6F6F6F] font-[400] mb-[10px]'>
              Ota-onaning telefon raqami
            </label>
            <input
              type='tel'
              id='parentPhone'
              value={formData.parentPhone}
              onChange={handleChange}
              className='w-full sm:w-[375px] h-[52px] px-4 border border-[#E0E0E0] bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300 ease-in-out'
              placeholder='+998 (99) 999 99 99'
              required
            />
            {errors.parentPhone && (
              <p className='text-red-600 text-sm mt-1'>{errors.parentPhone}</p>
            )}
          </div>

          {/* Direction Select */}
          <div>
            <label htmlFor='direction' className='block text-[#6F6F6F] font-[400] mb-[10px]'>
              Yo'nalishni tanlang
            </label>
            <select
              id='direction'
              value={formData.direction}
              onChange={handleChange}
              className='custom-select w-full sm:w-[375px] h-[52px] px-4 border border-[#E0E0E0] bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300 ease-in-out'
              required
            >
              <option value='axborot'>Axborot xavfsizligi</option>
              {/* Qo'shimcha yo'nalishlar qo'shishingiz mumkin */}
            </select>
          </div>

          {/* Language Select */}
          <div>
            <label htmlFor='language' className='block text-[#6F6F6F] font-[400] mb-[10px]'>
              O'qitish tilini tanlang
            </label>
            <select
              id='language'
              value={formData.language}
              onChange={handleChange}
              className='custom-select w-full sm:w-[375px] h-[52px] px-4 border border-[#E0E0E0] bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300 ease-in-out'
              required
            >
              <option value='uzbek'>O'zbekcha</option>
              {/* Qo'shimcha tillar qo'shishingiz mumkin */}
            </select>
          </div>

          {/* Submit Button */}
          <div >
            <button
              type='submit'
              className=' cursor-pointer mt-[10px] w-full sm:w-[375px] h-[49px] bg-[#FFD859] font-[500] rounded-[4px] text-[#303030] text-[16px] hover:scale-[1.01] transition duration-300 '
            >
              Yuborish
            </button>
          </div>

          {submitStatus === 'success' && (
            <p className='text-green-600 text-center mt-4 font-medium'>
              Ariza muvaffaqiyatli yuborildi!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form_main;