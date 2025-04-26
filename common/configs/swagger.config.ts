export const SWAGGER_TITLE = 'React Homeworks API';

export const SWAGGER_AUTH_NAME = 'JWT-auth';

export const SWAGGER_URL = 'api';

export const getCustomCss = (darkThemeCss: string, lightThemeCss: string): string => `
      :root {
        --current-theme: light;
      }

      :root[data-theme='light'] {
        ${lightThemeCss}
      }

      :root[data-theme='dark'] {
        ${darkThemeCss}
      }
      
      #theme-toggle {
        position: fixed;
        top: 10px;
        right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        background-color: #f9f9f9;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        overflow: hidden;
      }
      
      #theme-toggle::before {
        content: '☀️';
        font-size: 24px;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        opacity: 1;
      }
      
      :root[data-theme='dark'] #theme-toggle::before {
        content: '🌙';
        transform: rotate(360deg);
      }
      
      #theme-toggle:hover {
        transform: scale(1.1); /* Эффект увеличения */
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
      }
      
      #theme-toggle:active {
        transform: scale(0.95); /* Эффект уменьшения при клике */
      }
      
      /* Стили для тёмной темы */
      :root[data-theme='dark'] #theme-toggle {
        background-color: #333;
        box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
      }
      
      :root[data-theme='dark'] #theme-toggle:hover {
        box-shadow: 0 6px 8px rgba(255, 255, 255, 0.15);
      }
`;

export const CUSTOM_JS = `
 document.addEventListener('DOMContentLoaded', () => {
        const themeSwitcher = document.createElement('div');
        themeSwitcher.style.position = 'fixed';
        themeSwitcher.style.top = '10px';
        themeSwitcher.style.right = '10px';
        themeSwitcher.style.zIndex = 1000;
        themeSwitcher.innerHTML = '<button id="theme-toggle"></button>';
        document.body.appendChild(themeSwitcher);

        const savedTheme = localStorage.getItem('swagger-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        document.getElementById('theme-toggle').addEventListener('click', () => {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = currentTheme === 'light' ? 'dark' : 'light';

          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('swagger-theme', newTheme);
        });
      });
`;
