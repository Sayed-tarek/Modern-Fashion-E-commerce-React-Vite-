import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiUserCheck } from 'react-icons/fi';
import { FaGoogle, FaFacebook } from 'react-icons/fa6';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import brandLogoImg from "../../assets/images/header_bachground.jpg";
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.email.trim()) {
      newErrors.email = currentLang === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = currentLang === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Please enter a valid email format.';
    }

    if (!formData.password) {
      newErrors.password = currentLang === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = currentLang === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(currentLang === 'ar' ? 'تم تسجيل الدخول بنجاح! مرحباً بعودتك.' : 'Signed in successfully! Welcome back.');
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="auth-page-wrapper">
      <Navbar />

      <main className="auth-main-container">
        <div className="auth-split-card" data-aos="zoom-in">
          {/* Left Side: Fashion Hero Image */}
          <div className="auth-hero-col" data-aos="fade-right" data-aos-delay="150">
            <div className="auth-hero-overlay" />

            <Link to="/" className="auth-hero-brand">
              <img src={brandLogoImg} alt="AERO STEP" className="brand-logo-img" />
              <span className="brand-title">AERO STEP</span>
            </Link>

            <div className="auth-hero-content">
              <span className="hero-welcome-badge">
                <FiUserCheck size={14} />
                <span>{currentLang === 'ar' ? 'أزياء فاخرة حصرية' : 'LUXURY SELECTION'}</span>
              </span>
              <h2 className="hero-headline">
                {currentLang === 'ar'
                  ? 'خطواتك نحو الأناقة المتميزة تبدأ من هنا'
                  : 'Elevate Your Streetwear & Athletic Style'}
              </h2>
              <p className="hero-subtext">
                {currentLang === 'ar'
                  ? 'انضم لعالم آيرو ستيب واستمتع بأحدث التشكيلات الحصرية، الشحن السريع والعروض المخصصة لك.'
                  : 'Join Aero Step to access exclusive drops, personal offers, fast shipping, and seamless checkout.'}
              </p>
            </div>
          </div>

          {/* Right Side: Authentication Card Form */}
          <div className="auth-form-col" data-aos="fade-left" data-aos-delay="200">
            <div className="auth-form-header">
              <h1 className="auth-form-title">
                {currentLang === 'ar' ? 'مرحباً بعودتك' : 'Welcome Back'}
              </h1>
              <p className="auth-form-subtitle">
                {currentLang === 'ar'
                  ? 'سجل الدخول لمتابعة تسوق أحدث الأحذية والأزياء'
                  : 'Sign in to continue shopping your favorite items.'}
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* Email Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">
                  {currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="input-with-icon">
                  <FiMail className="field-icon" size={18} />
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className={`auth-input ${errors.email ? 'has-error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="login-password">
                  {currentLang === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="input-with-icon">
                  <FiLock className="field-icon" size={18} />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    className={`auth-input ${errors.password ? 'has-error' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options-row">
                <label className="remember-checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>{currentLang === 'ar' ? 'تذكرني' : 'Remember me'}</span>
                </label>

                <a href="#forgot" className="forgot-password-link" onClick={(e) => { e.preventDefault(); alert(currentLang === 'ar' ? 'تم إرسال رابط إعادة التعيين لبريدك' : 'Reset link sent to your email.'); }}>
                  {currentLang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                </a>
              </div>

              {/* Primary Submit Button */}
              <button type="submit" className="auth-submit-btn">
                {currentLang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="auth-divider">
                <span>{currentLang === 'ar' ? 'أو' : 'OR'}</span>
              </div>

              {/* Social Login Buttons */}
              <div className="social-login-grid">
                <button
                  type="button"
                  className="social-btn"
                  onClick={() => alert('Google Login')}
                >
                  <FaGoogle color="#EA4335" size={16} />
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="social-btn"
                  onClick={() => alert('Facebook Login')}
                >
                  <FaFacebook color="#1877F2" size={16} />
                  <span>Facebook</span>
                </button>
              </div>

              {/* Continue as Guest Button */}
              <Link to="/shop" className="guest-btn">
                <span>{currentLang === 'ar' ? 'المتابعة كزائر بدون حساب' : 'Continue as Guest'}</span>
                <FiArrowRight size={14} style={{ transform: currentLang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </Link>
            </form>

            {/* Bottom Register Link */}
            <div className="auth-footer-text">
              <span>{currentLang === 'ar' ? 'ليس لديك حساب بعد؟' : "Don't have an account?"}</span>
              <Link to="/register" className="auth-footer-link">
                {currentLang === 'ar' ? 'إنشاء حساب جديد' : 'Create Account'}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
