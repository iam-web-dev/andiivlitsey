import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router';
import { ApplicationsService } from '../../Services/applications';
import { DirectionsService } from '../../Services/directions';

const Form_main = ({ lang }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+998 ',
    age: '15',
    parentPhone: '+998 ',
    direction: '',
    language: lang || 'uz',
    message: ''
  });

  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const response = await DirectionsService.getDirections();
        const directionsList = response.results || response;
        setDirections(directionsList);
        if (directionsList.length > 0 && !formData.direction) {
          setFormData(prev => ({ ...prev, direction: directionsList[0].id }));
        }
      } catch (error) {
        console.error('Failed to fetch directions:', error);
      }
    };
    fetchDirections();
  }, [formData.direction]);

  // Handle lang change from parent
  useEffect(() => {
    if (lang) {
      setFormData(prev => ({ ...prev, language: lang }));
    }
  }, [lang]);

  const formatPhoneNumber = (value) => {
    // Always start with +998
    let digits = value.replace(/\D/g, '');

    // If user somehow deleted 998, put it back
    if (!digits.startsWith('998')) {
      digits = '998' + digits;
    }

    // Limit to 12 digits (998 + 9 digits)
    digits = digits.slice(0, 12);

    let formatted = '+';
    // 998
    formatted += digits.slice(0, 3);

    if (digits.length > 3) {
      formatted += ' (' + digits.slice(3, 5);
    }
    if (digits.length > 5) {
      formatted += ') ' + digits.slice(5, 8);
    }
    if (digits.length > 8) {
      formatted += ' ' + digits.slice(8, 10);
    }
    if (digits.length > 10) {
      formatted += ' ' + digits.slice(10);
    }
    return formatted;
  };

  const stripPhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return '+' + digits;
  };

  const handleChange = (e) => {
    let { id, value } = e.target;
    if (id === 'phone' || id === 'parentPhone') {
      // Don't allow deleting the prefix +998
      // If the current value is just "+998 " or shorter, and user tries to delete, keep it
      if (value.length < 5) {
        value = '+998 ';
      }
      value = formatPhoneNumber(value);
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = lang === "uz" ? "To'liq ismingizni kiriting" : lang === "ru" ? "Введите ваше полное имя" : "Enter your full name";
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 12) {
      newErrors.phone = lang === "uz" ? "To'g'ri telefon raqamini kiriting" : lang === "ru" ? "Введите правильный номер телефона" : "Enter valid phone number";
    }

    const parentPhoneDigits = formData.parentPhone.replace(/\D/g, '');
    if (parentPhoneDigits.length !== 12) {
      newErrors.parentPhone = lang === "uz" ? "Ota-onaning telefon raqamini kiriting" : lang === "ru" ? "Введите номер телефона родителей" : "Enter parent's phone number";
    }

    if (!formData.direction) {
      newErrors.direction = lang === "uz" ? "Yo'nalishni tanlang" : lang === "ru" ? "Выберите направление" : "Select direction";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const apiData = {
      full_name: formData.fullName,
      phone: stripPhone(formData.phone),
      age: parseInt(formData.age),
      parent_phone: stripPhone(formData.parentPhone),
      direction: parseInt(formData.direction),
      teaching_language: formData.language,
      message: formData.message || (lang === "uz" ? "Xabar yo'q" : lang === "ru" ? "Нет сообщения" : "No message")
    };

    try {
      await ApplicationsService.createApplication(apiData);
      navigate('/success');
    } catch (error) {
      console.error('Submission error:', error);
      alert(lang === "uz" ? "Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring." : lang === "ru" ? "Произошла ошибка. Пожалуйста, попробуйте еще раз." : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[field] || '';
  };

  const t = {
    title: { uz: "Ariza qoldirish", ru: "Оставить заявку", en: "Leave an application" },
    fullName: { uz: "To'liq ism (familiya, ism, otasining ismi)", ru: "Полное имя (фамилия, имя, отчество)", en: "Full name (last name, first name, patronymic)" },
    fullNamePlaceholder: { uz: "Ismingizni kiriting", ru: "Введите ваше имя", en: "Enter your name" },
    phone: { uz: "Telefon raqami", ru: "Номер телефона", en: "Phone number" },
    parentPhone: { uz: "Ota-onaning telefon raqami", ru: "Номер телефона родителей", en: "Parent's phone number" },
    age: { uz: "Yoshni tanlang", ru: "Выберите возраст", en: "Select age" },
    direction: { uz: "Yo'nalish", ru: "Направление", en: "Direction" },
    language: { uz: "O'qitish tili", ru: "Язык обучения", en: "Language of instruction" },
    message: { uz: "Xabar (ixtiyoriy)", ru: "Сообщение (необязательно)", en: "Message (optional)" },
    messagePlaceholder: { uz: "Qo'shimcha savollar yoki xabarlar...", ru: "Дополнительные вопросы или сообщения...", en: "Additional questions or messages..." },
    submit: { uz: "Ariza yuborish", ru: "Отправить заявку", en: "Send application" },
    submitting: { uz: "Yuborilmoqda...", ru: "Отправка...", en: "Sending..." }
  };

  return (
    <div className='w-full h-full flex justify-center bg-[#FFFFFF] py-[80px]'>
      <div className='w-full sm:w-[1220px] h-full flex gap-[40px] flex-col items-center px-4'>
        <h1 className='font-inter font-[700] text-[36px] text-[#303030] text-center'>{t.title[lang] || t.title.uz}</h1>

        <form
          onSubmit={handleSubmit}
          className='w-full max-w-[500px] flex flex-col gap-6'
        >
          {/* Full Name */}
          <div className='flex flex-col'>
            <label htmlFor='fullName' className='text-[#6F6F6F] font-[400] mb-2'>
              {t.fullName[lang] || t.fullName.uz}
            </label>
            <input
              type='text'
              id='fullName'
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full h-[52px] px-4 border ${errors.fullName ? 'border-red-500' : 'border-[#E0E0E0]'} bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300`}
              placeholder={t.fullNamePlaceholder[lang] || t.fullNamePlaceholder.uz}
            />
            {errors.fullName && <p className='text-red-500 text-xs mt-1'>{errors.fullName}</p>}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Phone Number */}
            <div className='flex flex-col'>
              <label htmlFor='phone' className='text-[#6F6F6F] font-[400] mb-2'>
                {t.phone[lang] || t.phone.uz}
              </label>
              <input
                type='tel'
                id='phone'
                value={formData.phone}
                onChange={handleChange}
                className={`w-full h-[52px] px-4 border ${errors.phone ? 'border-red-500' : 'border-[#E0E0E0]'} bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300`}
                placeholder='+998 (99) 999 99 99'
              />
              {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>}
            </div>

            {/* Age Select */}
            <div className='flex flex-col'>
              <label htmlFor='age' className='text-[#6F6F6F] font-[400] mb-2'>
                {t.age[lang] || t.age.uz}
              </label>
              <select
                id='age'
                value={formData.age}
                onChange={handleChange}
                className='custom-select w-full h-[52px] px-4 border border-[#E0E0E0] bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300'
              >
                {[14, 15, 16, 17, 18, 19, '19+'].map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Parent Phone Number */}
          <div className='flex flex-col'>
            <label htmlFor='parentPhone' className='text-[#6F6F6F] font-[400] mb-2'>
              {t.parentPhone[lang] || t.parentPhone.uz}
            </label>
            <input
              type='tel'
              id='parentPhone'
              value={formData.parentPhone}
              onChange={handleChange}
              className={`w-full h-[52px] px-4 border ${errors.parentPhone ? 'border-red-500' : 'border-[#E0E0E0]'} bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300`}
              placeholder='+998 (99) 999 99 99'
            />
            {errors.parentPhone && <p className='text-red-500 text-xs mt-1'>{errors.parentPhone}</p>}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Direction Select */}
            <div className='flex flex-col'>
              <label htmlFor='direction' className='text-[#6F6F6F] font-[400] mb-2'>
                {t.direction[lang] || t.direction.uz}
              </label>
              <select
                id='direction'
                value={formData.direction}
                onChange={handleChange}
                className='custom-select truncate w-full overflow-x-hidden h-[52px] pl-4 pr-8 border border-[#E0E0E0] bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300'
              >
                {directions.map(dir => (
                  <option key={dir.id} value={dir.id}>{dir[`title_${lang}`].length > 30 ? dir[`title_${lang}`].slice(0, 30) + '...' : dir[`title_${lang}`]}</option>
                ))}
              </select>
              {errors.direction && <p className='text-red-500 text-xs mt-1'>{errors.direction}</p>}
            </div>

            {/* Language Select */}
            <div className='flex flex-col'>
              <label htmlFor='language' className='text-[#6F6F6F] font-[400] mb-2'>
                {t.language[lang] || t.language.uz}
              </label>
              <select
                id='language'
                value={formData.language}
                onChange={handleChange}
                className='custom-select w-full h-[52px] px-4 border border-[#E0E0E0] bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300'
              >
                <option value='uz'>O'zbekcha</option>
                <option value='ru'>Ruscha</option>
                <option value='en'>Inglizcha</option>
              </select>
            </div>
          </div>

          {/* Message Textarea */}
          <div className='flex flex-col'>
            <label htmlFor='message' className='text-[#6F6F6F] font-[400] mb-2'>
              {t.message[lang] || t.message.uz}
            </label>
            <textarea
              id='message'
              value={formData.message}
              onChange={handleChange}
              className='w-full min-h-[100px] p-4 border border-[#E0E0E0] bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD859] transition duration-300'
              placeholder={t.messagePlaceholder[lang] || t.messagePlaceholder.uz}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className='pt-2'>
            <button
              type='submit'
              disabled={loading}
              className={`w-full h-[52px] ${loading ? 'bg-gray-400' : 'bg-[#FFD859] hover:bg-[#ffcf33]'} font-[600] rounded-md text-[#303030] text-[16px] transition duration-300 flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#303030] border-t-transparent rounded-full animate-spin"></div>
                  {t.submitting[lang] || t.submitting.uz}
                </>
              ) : (t.submit[lang] || t.submit.uz)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form_main;