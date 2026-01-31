
import { createApp } from 'vue';
import App from './App';

const mountApp = () => {
  try {
    const app = createApp(App);
    app.mount('#app');
  } catch (error) {
    console.error("Vue Initialization Error:", error);
  }
};

mountApp();
