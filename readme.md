# Vue Testing

Untuk melakukan unit testing pada vue, kita bisa menggunakan `vue-test-utils` dan `vitest`. Keduanya  bekerja  sama  untuk  menyediakan  framework  pengujian  yang  kuat,  efisien,  dan  mudah digunakan, terutama untuk aplikasi Vue.js. Kita juga akan menggunakan `jsdom` untuk mensimulasikan DOM dalam pengujian.
- [vue-test-utils](https://test-utils.vuejs.org/) : menyediakan API yang memungkinkan kita untuk menguji komponen Vue secara terpisah, tanpa perlu menjalankan aplikasi Vue secara keseluruhan.
- [vitest](https://vitest.dev/) : framework pengujian yang cepat dan efisien, yang dirancang untuk bekerja dengan baik dengan Vue.js. Vitest menyediakan fitur seperti snapshot testing, mocking, dan asserstion yang kuat.
- [jsdom](https://www.npmjs.com/package/jsdom) : library yang memungkinkan kita untuk mensimulasikan DOM dalam lingkungan Node.js, sehingga kita dapat menguji komponen Vue tanpa perlu browser.

# Demo 
## Instalation
Step by step untuk melakukan unit testing pada Vue.js:
1. Instalasi `vue-test-utils`, `vitest` dan `jsdom` pada project Vue.js:
```
npm install -D @vue/test-utils vitest jsdom
```

2. Pada file `vitest.config.js`, kita perlu mengkonfigurasi Vitest untuk menggunakan jsdom sebagai environment testing:
- [globals](https://vitest.dev/config/#globals) : Mengaktifkan global API seperti `describe`, `it`, dll.
- [environment](https://vitest.dev/config/#environment): Menggunakan jsdom sebagai environment testing, yang memungkinkan kita untuk mensimulasikan DOM dalam pengujian.
- transformMode : Mengaktifkan transformasi untuk file JavaScript dan TypeScript, sehingga kita dapat menggunakan sintaks modern seperti ES6, JSX, dan TypeScript dalam pengujian.
```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, 
    environment: 'jsdom',
    transformMode: {
        web: [/\.[jt]sx?$/], // Mengaktifkan transformasi untuk file .js, .jsx, .ts, dan .tsx
    },
  },
});
```

3. Pada file `package.json`, kita perlu menambahkan script untuk menjalankan pengujian:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

## Basic Testing
Buat file pengujian untuk komponen Vue. Misalnya, jika kita memiliki komponen `CounterPage`, kita bisa membuat file `Counter.spec.js` di dalam folder `src/tests/unit`:
```js
import { mount } from '@vue/test-utils';
import CounterPage from '@/views/CounterPage.vue';

describe('CounterPage', () => {
    it('renders the component', () => {
        const wrapper = mount(CounterPage);
        expect(wrapper.exists()).toBe(true);
    });

    it('increments the counter when button is clicked', async () => {
        const wrapper = mount(CounterPage);
        const button = wrapper.find('button#increment');

        await button.trigger('click');
        
        console.log(wrapper.text());
        console.log(wrapper.html());
        expect(wrapper.text()).toContain('Count : 1');
    });

    it('decrements the counter when button is clicked', async () => {
        const wrapper = mount(CounterPage);
        const button = wrapper.find('button#decrement')

        await button.trigger('click');

        expect(wrapper.text()).toContain('Count : -1');
    });
});
```

## Props Testing
Untuk menguji komponen Vue yang menerima props, kita bisa menggunakan `props` saat melakukan mount komponen. Berikut adalah contoh pengujian untuk komponen yang menerima props:

```js
it('renders the correct message from prop', () => {
  const wrapper = mount(CounterPage, {
    props: {
      message : 'hello world'
    }
  });

  expect(wrapper.exists()).toContain('message : hello world');
});
```

## Pinia Testing