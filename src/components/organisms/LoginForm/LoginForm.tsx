'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './LoginForm.module.scss';

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log('Login attempt:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.title}>로그인</h2>
      <p className={styles.description}>
        <span className={styles.highlight}>진료협력센터</span> 홈페이지는 의료진 전용 홈페이지로 회원 서비스는 로그인 후 이용하실 수 있습니다.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="아이디"
            value={formData.id}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        </div>
        <button type="submit" className={styles.loginButton}>
          로그인
        </button>
      </form>
      <div className={styles.links}>
        <Link href="/find-id" className={styles.link}>
          아이디 찾기
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="/find-password" className={styles.link}>
          비밀번호 찾기
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="/signup" className={styles.link}>
          회원가입
        </Link>
      </div>
    </div>
  );
};
