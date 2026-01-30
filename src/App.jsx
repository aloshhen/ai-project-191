import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Star, Heart, Shield, Phone, Mail, Instagram, Send, 
  ChevronRight, ChevronDown, AlertCircle, CheckCircle, 
  Eye, User, Clock, Award, MessageSquare, X, Menu
} from 'lucide-react'

// Web3Forms Handler Hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e, accessKey) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    
    const formData = new FormData(e.target);
    formData.append('access_key', accessKey);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);
        e.target.reset();
      } else {
        setIsError(true);
        setErrorMessage(data.message || 'Щось пішло не так');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Помилка мережі. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
  };
  
  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm };
};

// Scroll Animation Component
const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler();
  
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // Replace with your Web3Forms Access Key from https://web3forms.com

  const procedures = [
    {
      id: 1,
      title: 'Перманентний макіяж брів',
      description: 'Природна техніка волоскового методу або легка розтушовка для ідеальної форми брів',
      duration: '2-3 години',
      price: 'від 3000 грн',
      icon: Eye,
      details: 'Створюємо ідеальну форму брів з урахуванням особливостей обличчя. Використовуємо безпечні гіпоалергенні пігменти.',
      care: [
        'Перші 7 днів не мочити та не торкатися брів',
        'Обробляти антисептиком 2 рази на день',
        'Не відривати кірочки, які утворюються',
        'Уникати сауни та басейну 2 тижні'
      ]
    },
    {
      id: 2,
      title: 'Перманентний макіяж губ',
      description: 'Корекція форми, об\'єму та кольору губ для природного або яскравого ефекту',
      duration: '2-3 години',
      price: 'від 3500 грн',
      icon: Heart,
      details: 'Надаємо губам бажаний відтінок та форму. Можливість корекції асиметрії та збільшення візуального об\'єму.',
      care: [
        'Перші 3 дні обробляти вазеліном кожні 2 години',
        'Не вживати гарячі напої та їжу тиждень',
        'Уникати поцілунків перші 5 днів',
        'Захищати від сонця SPF 50+'
      ]
    },
    {
      id: 3,
      title: 'Перманентна підводка очей',
      description: 'Акцент на очі з ефектом природного об\'єму вій або класична стрілка',
      duration: '1.5-2 години',
      price: 'від 2500 грн',
      icon: Star,
      details: 'Підкреслюємо природну красу очей, створюємо ефект густих вій або елегантні стрілки.',
      care: [
        'Не мочити очі 5 днів',
        'Не використовувати косметику для очей тиждень',
        'Спати на спині перші 3 ночі',
        'Уникати сонця та соляріїв 2 тижні'
      ]
    },
    {
      id: 4,
      title: 'Чистка обличчя',
      description: 'Глибоке очищення пор, видалення комедонів та оновлення шкіри',
      duration: '1-1.5 години',
      price: 'від 800 грн',
      icon: Award,
      details: 'Комплексна процедура для здорової та сяючої шкіри. Підходить для всіх типів шкіри.',
      care: [
        'Не торкатися обличчя руками 24 години',
        'Не використовувати декоративну косметику день',
        'Наносити заспокійливий крем',
        'Уникати прямих сонячних променів'
      ]
    },
    {
      id: 5,
      title: 'Біоревіталізація',
      description: 'Ін\'єкції гіалуронової кислоти для зволоження та омолодження шкіри',
      duration: '30-40 хвилин',
      price: 'від 2000 грн',
      icon: Shield,
      details: 'Глибоке зволоження шкіри, покращення тургору та еластичності. Видимий результат після першої процедури.',
      care: [
        'Не масажувати обличчя 3 дні',
        'Уникати саун та басейнів тиждень',
        'Не вживати алкоголь 2 дні',
        'Захищати від сонця SPF 30+'
      ]
    },
    {
      id: 6,
      title: 'Мезотерапія обличчя',
      description: 'Ін\'єкційне введення вітамінних коктейлів для покращення стану шкіри',
      duration: '40-60 хвилин',
      price: 'від 1500 грн',
      icon: Star,
      details: 'Живлення шкіри вітамінами та мінералами. Покращення кольору обличчя та зменшення зморшок.',
      care: [
        'Перші 6 годин не мочити обличчя',
        'Не використовувати косметику день',
        'Уникати фізичних навантажень 2 дні',
        'Не відвідувати солярій тиждень'
      ]
    }
  ];

  const contraindications = [
    {
      title: 'Абсолютні протипокази',
      items: [
        'Вагітність та період годування груддю',
        'Онкологічні захворювання',
        'ВІЛ, СНІД, гепатити',
        'Цукровий діабет в стадії декомпенсації',
        'Епілепсія',
        'Психічні розлади',
        'Келоїдна хвороба'
      ],
      icon: AlertCircle,
      color: 'red'
    },
    {
      title: 'Відносні протипокази',
      items: [
        'Загострення хронічних захворювань',
        'Герпес в активній фазі',
        'Підвищена температура тіла',
        'Прийом антибіотиків',
        'Алергічні реакції',
        'Менструація (рекомендується перенести)',
        'Високий артеріальний тиск'
      ],
      icon: Shield,
      color: 'yellow'
    }
  ];

  const products = [
    {
      name: 'Phibrows Pigments',
      description: 'Преміум пігменти для перманентного макіяжу брів. Стійкі, гіпоалергенні, з натуральними відтінками.',
      origin: 'Сербія',
      icon: Star
    },
    {
      name: 'Perma Blend',
      description: 'Професійні пігменти для губ та очей. Сертифіковані в ЄС, тривала стійкість кольору.',
      origin: 'США',
      icon: Heart
    },
    {
      name: 'Hyalual',
      description: 'Біоревіталізанти на основі гіалуронової кислоти. Швейцарська якість для омолодження шкіри.',
      origin: 'Швейцарія',
      icon: Shield
    },
    {
      name: 'Dermaheal',
      description: 'Мезотерапевтичні коктейлі з пептидами та вітамінами. Корейські інновації в косметології.',
      origin: 'Корея',
      icon: Award
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-rose-100 shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-2 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">BeautyMaster</span>
                <p className="text-xs text-gray-500">Перманентний макіяж</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('procedures')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Процедури</button>
              <button onClick={() => scrollToSection('contraindications')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Протипокази</button>
              <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Препарати</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Контакти</button>
            </div>

            <div className="hidden lg:flex items-center space-x-3">
              <a href="tel:+380123456789" className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-rose-500/30 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Записатись
              </a>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-rose-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 pb-4 space-y-3"
              >
                <button onClick={() => scrollToSection('procedures')} className="block w-full text-left py-2 px-4 hover:bg-rose-50 rounded-lg transition-colors">Процедури</button>
                <button onClick={() => scrollToSection('contraindications')} className="block w-full text-left py-2 px-4 hover:bg-rose-50 rounded-lg transition-colors">Протипокази</button>
                <button onClick={() => scrollToSection('products')} className="block w-full text-left py-2 px-4 hover:bg-rose-50 rounded-lg transition-colors">Препарати</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 px-4 hover:bg-rose-50 rounded-lg transition-colors">Контакти</button>
                <a href="tel:+380123456789" className="block w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-center py-3 rounded-xl font-semibold">
                  Записатись
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-pink-50/30 to-purple-100/50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-rose-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full mb-6 font-medium">
              <Star className="w-4 h-4" />
              Сертифікований майстер
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Перманентний<br />
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">Макіяж</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-rose-600 mb-6 font-bold">
              Природна краса на роки вперед
            </p>
            
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Професійні послуги перманентного макіяжу та косметології. Сучасні техніки, преміум препарати, індивідуальний підхід до кожного клієнта.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('procedures')}
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl shadow-rose-500/40 flex items-center gap-2"
              >
                Переглянути процедури
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-white hover:bg-rose-50 text-rose-600 px-10 py-4 rounded-xl text-lg font-bold transition-all border-2 border-rose-200 hover:border-rose-300 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Зв'язатися
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROCEDURES */}
      <section id="procedures" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                Наші <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Процедури</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Широкий спектр послуг для вашої краси та впевненості
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {procedures.map((procedure, index) => {
              const Icon = procedure.icon;
              return (
                <ScrollReveal key={procedure.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-gradient-to-br from-white to-rose-50/50 p-8 rounded-2xl border-2 border-rose-100 hover:border-rose-300 transition-all shadow-lg hover:shadow-xl cursor-pointer group"
                    onClick={() => setSelectedProcedure(procedure)}
                  >
                    <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-rose-500/30">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                      {procedure.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {procedure.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-rose-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {procedure.duration}
                      </div>
                      <div className="text-rose-600 font-bold text-lg">
                        {procedure.price}
                      </div>
                    </div>
                    
                    <button className="mt-4 w-full bg-rose-50 hover:bg-rose-100 text-rose-600 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                      Детальніше
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Procedure Details Modal */}
      <AnimatePresence>
        {selectedProcedure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProcedure(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
                    {selectedProcedure.icon && <selectedProcedure.icon className="w-7 h-7 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{selectedProcedure.title}</h3>
                    <p className="text-rose-600 font-bold text-xl mt-1">{selectedProcedure.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProcedure(null)}
                  className="p-2 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Опис процедури</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedProcedure.details}</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-rose-600" />
                    Рекомендації по догляду
                  </h4>
                  <ul className="space-y-2">
                    {selectedProcedure.care.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-rose-100">
                  <Clock className="w-4 h-4" />
                  Тривалість: {selectedProcedure.duration}
                </div>

                <button
                  onClick={() => {
                    setSelectedProcedure(null);
                    scrollToSection('contact');
                  }}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-rose-500/30"
                >
                  Записатися на процедуру
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTRAINDICATIONS */}
      <section id="contraindications" className="py-20 px-6 bg-gradient-to-b from-white to-rose-50/30">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Протипокази</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Важлива інформація для вашої безпеки
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {contraindications.map((category, index) => {
              const Icon = category.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <div className={`bg-white p-8 rounded-2xl border-2 ${category.color === 'red' ? 'border-red-200' : 'border-yellow-200'} shadow-lg`}>
                    <div className={`flex items-center gap-3 mb-6`}>
                      <div className={`${category.color === 'red' ? 'bg-red-100' : 'bg-yellow-100'} w-12 h-12 rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${category.color === 'red' ? 'text-red-600' : 'text-yellow-600'}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                    </div>
                    
                    <ul className="space-y-3">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${category.color === 'red' ? 'text-red-500' : 'text-yellow-500'}`} />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-200 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Важливо!</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Перед проведенням будь-якої процедури обов'язкова консультація з майстром. Якщо у вас є хронічні захворювання або ви приймаєте медикаменти, обов'язково повідомте про це майстра.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                Преміум <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Препарати</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Використовуємо тільки сертифіковані препарати світових брендів
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-rose-50 to-white p-8 rounded-2xl border-2 border-rose-100 hover:border-rose-300 transition-all shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h3>
                        <span className="inline-block bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {product.origin}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Гарантія якості</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Всі препарати мають необхідні сертифікати якості та дозволи МОЗ України. Ми регулярно оновлюємо асортимент та слідкуємо за новинками індустрії.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                Зв'яжіться <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">з нами</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Записатися на консультацію або задати питання
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl border-2 border-rose-100 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Контактна інформація</h3>
                  
                  <div className="space-y-6">
                    <a href="tel:+380123456789" className="flex items-center gap-4 group hover:bg-rose-50 p-4 rounded-xl transition-colors">
                      <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Телефон</p>
                        <p className="text-lg font-bold text-gray-900">+380 12 345 67 89</p>
                      </div>
                    </a>

                    <a href="https://instagram.com/beautymaster" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:bg-rose-50 p-4 rounded-xl transition-colors">
                      <div className="bg-gradient-to-br from-pink-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Instagram className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Instagram</p>
                        <p className="text-lg font-bold text-gray-900">@beautymaster</p>
                      </div>
                    </a>

                    <a href="https://t.me/beautymaster" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:bg-rose-50 p-4 rounded-xl transition-colors">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Telegram</p>
                        <p className="text-lg font-bold text-gray-900">@beautymaster</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-8 rounded-2xl text-white shadow-xl">
                  <h4 className="text-2xl font-bold mb-4">Графік роботи</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-white/20">
                      <span>Понеділок - П'ятниця</span>
                      <span className="font-bold">10:00 - 20:00</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/20">
                      <span>Субота</span>
                      <span className="font-bold">11:00 - 18:00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Неділя</span>
                      <span className="font-bold">Вихідний</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="bg-white p-8 rounded-2xl border-2 border-rose-100 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Форма зворотного зв'язку</h3>
                
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Ім'я</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Ваше ім'я"
                          required
                          className="w-full px-4 py-3 bg-rose-50/50 border-2 border-rose-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-500 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+380 12 345 67 89"
                          required
                          className="w-full px-4 py-3 bg-rose-50/50 border-2 border-rose-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-500 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email (необов'язково)</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-rose-50/50 border-2 border-rose-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-500 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Повідомлення</label>
                        <textarea
                          name="message"
                          placeholder="Розкажіть про бажану процедуру або задайте питання..."
                          rows="4"
                          required
                          className="w-full px-4 py-3 bg-rose-50/50 border-2 border-rose-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                        ></textarea>
                      </div>
                      
                      {isError && (
                        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm">{errorMessage}</span>
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 disabled:transform-none shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Відправка...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Відправити
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className="text-center py-12"
                    >
                      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        Повідомлення відправлено!
                      </h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Дякуємо за звернення. Ми зв'яжемося з вами найближчим часом.
                      </p>
                      <button
                        onClick={resetForm}
                        className="text-rose-600 hover:text-rose-700 font-semibold transition-colors"
                      >
                        Надіслати ще одне повідомлення
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-b from-gray-900 to-black py-12 px-6 border-t border-rose-900/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-2 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">BeautyMaster</span>
                <p className="text-xs text-gray-400">Перманентний макіяж</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="tel:+380123456789" className="text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">+380 12 345 67 89</span>
              </a>
              <a href="https://instagram.com/beautymaster" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://t.me/beautymaster" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-gray-800">
            © 2024 BeautyMaster. Всі права захищено.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;