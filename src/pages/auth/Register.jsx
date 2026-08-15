import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi';
import { FaGoogle, FaFacebook } from 'react-icons/fa6';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import brandLogoImg from "../../assets/images/header_bachground.jpg";
import './Login.css';
import './Register.css';

export const Register = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Password strength logic
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', fillClass: '', textClass: '' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass) || /[^a-zA-Z0-9]/.test(pass)) score += 1;

    if (score === 1) {
      return {
        score: 1,
        label: currentLang === 'ar' ? 'ضعيفة' : 'Weak',
        fillClass: 'strength-fill-weak',
        textClass: 'text-weak',
      };
    } else if (score === 2) {
      return {
        score: 2,
        label: currentLang === 'ar' ? 'متوسطة' : 'Medium',
        fillClass: 'strength-fill-medium',
        textClass: 'text-medium',
      };
    } else {
      return {
        score: 3,
        label: currentLang === 'ar' ? 'قوية جداً' : 'Strong',
        fillClass: 'strength-fill-strong',
        textClass: 'text-strong',
      };
    }
  };

  const strength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = currentLang === 'ar' ? 'الاسم الأول مطلوب' : 'First name is required.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = currentLang === 'ar' ? 'الاسم الأخير مطلوب' : 'Last name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = currentLang === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = currentLang === 'ar' ? 'صيغة البريد غير صحيحة' : 'Please enter a valid email format.';
    }

    if (!formData.password) {
      newErrors.password = currentLang === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = currentLang === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = currentLang === 'ar' ? 'تأكيد كلمة المرور مطلوب' : 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = currentLang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = currentLang === 'ar' ? 'يجب الموافقة على الشروط والأحكام' : 'You must agree to the Terms & Privacy Policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(currentLang === 'ar' ? 'تم إنشاء الحساب بنجاح! أهلاً بك في آيرو ستيب.' : 'Account created successfully! Welcome to Aero Step.');
      navigate('/login');
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
                <FiUserPlus size={14} />
                <span>{currentLang === 'ar' ? 'عضوية مجتمعنا المميز' : 'JOIN THE COMMUNITY'}</span>
              </span>
              <h2 className="hero-headline">
                {currentLang === 'ar'
                  ? 'انضم لعائلة آيرو ستيب وافتح عالم المزايا'
                  : 'Join the Snaabble Community'}
              </h2>
              <p className="hero-subtext">
                {currentLang === 'ar'
                  ? 'احصل على مكافآت الترحيب، متابعة الشحنات بسهولة، وعروض حصرية لأعضاء مجتمعنا فقط.'
                  : 'Create an account to track orders, save wishlists, and unlock exclusive rewards and member drops.'}
              </p>
            </div>
          </div>

          {/* Right Side: Register Form */}
          <div className="auth-form-col" data-aos="fade-left" data-aos-delay="200">
            <div className="auth-form-header">
              <h1 className="auth-form-title">
                {currentLang === 'ar' ? 'إنشاء حساب جديد' : 'Create Account'}
              </h1>
              <p className="auth-form-subtitle">
                {currentLang === 'ar'
                  ? 'انضم لمجتمعنا لتجربة تسوق فريدة ومميزة'
                  : 'Join the Snaabble community and start shopping.'}
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* First Name & Last Name 2-Column Row */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="register-firstname">
                    {currentLang === 'ar' ? 'الاسم الأول' : 'First Name'}
                  </label>
                  <div className="input-with-icon">
                    <FiUser className="field-icon" size={18} />
                    <input
                      id="register-firstname"
                      type="text"
                      name="firstName"
                      placeholder={currentLang === 'ar' ? 'أحمد' : 'John'}
                      className={`auth-input ${errors.firstName ? 'has-error' : ''}`}
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="register-lastname">
                    {currentLang === 'ar' ? 'الاسم الأخير' : 'Last Name'}
                  </label>
                  <div className="input-with-icon">
                    <FiUser className="field-icon" size={18} />
                    <input
                      id="register-lastname"
                      type="text"
                      name="lastName"
                      placeholder={currentLang === 'ar' ? 'العوضي' : 'Doe'}
                      className={`auth-input ${errors.lastName ? 'has-error' : ''}`}
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="register-email">
                    {currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <div className="input-with-icon">
                    <FiMail className="field-icon" size={18} />
                    <input
                      id="register-email"
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

                <div className="form-group">
                  <label className="form-label" htmlFor="register-phone">
                    {currentLang === 'ar' ? 'رقم الهاتف (اختياري)' : 'Phone Number'}
                  </label>
                  <div className="input-with-icon">
                    <FiPhone className="field-icon" size={18} />
                    <input
                      id="register-phone"
                      type="tel"
                      name="phone"
                      placeholder="+20 100 000 0000"
                      className="auth-input"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label" htmlFor="register-password">
                    {currentLang === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="input-with-icon">
                    <FiLock className="field-icon" size={18} />
                    <input
                      id="register-password"
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

                  {/* Strength Indicator */}
                  {formData.password && (
                    <div className="password-strength-container">
                      <div className="strength-bar-track">
                        <div className={`strength-bar-fill ${strength.fillClass}`} />
                      </div>
                      <div className="strength-text">
                        <span style={{ color: 'var(--text-muted)' }}>
                          {currentLang === 'ar' ? 'قوة كلمة المرور:' : 'Strength:'}
                        </span>
                        <span className={strength.textClass}>{strength.label}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="register-confirm-password">
                    {currentLang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  </label>
                  <div className="input-with-icon">
                    <FiLock className="field-icon" size={18} />
                    <input
                      id="register-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="••••••••"
                      className={`auth-input ${errors.confirmPassword ? 'has-error' : ''}`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="form-group">
                <label className="remember-checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <span>
                    {currentLang === 'ar'
                      ? 'أوافق على الشروط والأحكام وسياسة الخصوصية'
                      : 'I agree to the Terms & Privacy Policy'}
                  </span>
                </label>
                {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="auth-submit-btn">
                {currentLang === 'ar' ? 'إنشاء الحساب' : 'Create Account'}
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
                  onClick={() => alert('Google Register')}
                >
                  <FaGoogle color="#EA4335" size={16} />
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="social-btn"
                  onClick={() => alert('Facebook Register')}
                >
                  <FaFacebook color="#1877F2" size={16} />
                  <span>Facebook</span>
                </button>
              </div>
            </form>

            {/* Bottom Login Link */}
            <div className="auth-footer-text">
              <span>{currentLang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}</span>
              <Link to="/login" className="auth-footer-link">
                {currentLang === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
