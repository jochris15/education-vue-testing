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

2. Pada file `vite.config.js`, kita perlu mengkonfigurasi Vitest untuk menggunakan jsdom sebagai environment testing:
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

## [Basic Testing](https://vitest.dev/guide/#writing-tests)
1. Buat file pengujian untuk komponen Vue. Misalnya, jika kita memiliki komponen `CounterPage`, kita bisa membuat file `Counter.spec.js` di dalam folder `src/tests/unit`
2. Gunakan [`mount`](https://v1.test-utils.vuejs.org/api/mount.html#mount) dari `@vue/test-utils` untuk merender komponen Vue yang ingin kita uji dan tampung hasilnya dalam variabel `wrapper`. `wrapper` ini akan berisi semua informasi tentang komponen yang telah dirender, termasuk elemen DOM, props, dan data.
3. Buatlah testing dengan menggunakan `describe` dan `it` dari Vitest. `describe` digunakan untuk mengelompokkan beberapa pengujian, sedangkan `it` digunakan untuk mendefinisikan pengujian individual.
4. Gunakan `expect` dari Vitest untuk melakukan assertion pada hasil pengujian. `expect` digunakan untuk memeriksa apakah hasil yang diharapkan sesuai dengan hasil yang sebenarnya.
5. Testing pertama memastikan bahwa komponen dapat dirender dengan benar. Kita menggunakan `mount` untuk merender komponen `CounterPage` dan memeriksa apakah komponen tersebut ada dengan menggunakan `exists()`.
6. Testing kedua dan ketiga menguji interaksi pengguna dengan komponen, seperti mengklik tombol untuk meningkatkan atau mengurangi nilai counter. Kita menggunakan `trigger` untuk mensimulasikan klik pada tombol dan kemudian memeriksa apakah nilai counter sesuai dengan menggunakan`.text()` 

***example :***
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

## [Props Testing](https://v1.test-utils.vuejs.org/api/wrapper/#props)
Untuk menguji komponen Vue yang menerima props, kita bisa menggunakan `propsData` saat melakukan mount komponen dan `props()` pada saat mengecheck valuenya. Berikut adalah contoh pengujian untuk komponen yang menerima props:

```js
it('renders the correct message from prop', () => {
  const wrapper = mount(CounterPage, {
   propsData: {
    message: 'hello world'
  }
  });

  expect(wrapper.props('message')).toBe('hello world')
});
```

## [Pinia Testing](https://pinia.vuejs.org/cookbook/testing.html#Unit-testing-a-store)
1. Gunakan `beforeEach()` untuk membuat instance store Pinia sebelum setiap pengujian. 
2. Gunakan `setActivePinia()` dan `createPinia()` untuk mengaktifkan Pinia sebelum melakukan mount komponen.

```js
import { createPinia, setActivePinia } from 'pinia';

beforeEach(() => {
    // creates a fresh pinia and makes it active
    setActivePinia(createPinia())
})
```

<br>
<br>
<br>
<hr>

# API Call Testing
Untuk menguji komponen Vue yang melakukan panggilan API, kita bisa menggunakan `Mocking API`.

Apa itu `Mocking API`? `Mocking API` adalah teknik untuk mensimulasikan respons dari API tanpa benar-benar melakukan panggilan ke server. Ini berguna untuk menguji komponen yang bergantung pada data dari API tanpa perlu mengakses jaringan.

Kenapa `Mocking API` penting?
- Menghindari ketergantungan pada API eksternal yang tidak dapat dijamin ketersediaannya, kecepatan, atau konsistensinya.
- Memberikan kontrol penuh atas data yang dikembalikan oleh API sehingga kamu dapat menguji berbagai kondisi.
- Mempercepat pengujian dengan menghindari latensi jaringan dan menunggu respons API.
- Meningkatkan keandalan dan konsistensi pengujian.


# Demo API Call Testing
Pada demo ini, kita akan melakukan testing pada komponen UserList yang merender API https://jsonplaceholder.typicode.com

Install terlebih dahulu package `flush-promises` pada app vue kita.
```bash
npm i flush-promises
```

[`flush-promises`](https://www.npmjs.com/package/flush-promises) digunakan untuk menunggu semua promise (termasuk promise dari API call atau async/await) selesai sebelum melakukan assertion pada unit test. Ini penting karena banyak komponen Vue melakukan operasi async (seperti fetch data dari API) di lifecycle hooks (misal: mounted). Dengan flush-promises, kamu memastikan DOM sudah ter-update sebelum melakukan pengecekan hasil test.

## Fetch Testing

Step by step untuk melakukan unit testing pada komponen yang melakukan fetch data: 
1. Buat file `UserList.spec.js` di dalam folder `src/tests/unit`.
2. Import `vi` & gunakan `vi.fn()` dari Vitest untuk membuat mock function yang akan digunakan untuk menggantikan fungsi `fetch` bawaan JavaScript.
3. Import & gunakan `mount` dari `@vue/test-utils` untuk merender komponen `UserList`.
4. Import & gunakan `flushPromises` untuk menunggu semua promise selesai sebelum melakukan assertion.
5. Verifikasi DOM dengan `findAllComponent({name : 'UserItem'})` untuk memastikan bahwa komponen `UserItem` dirender sesuai dengan data yang diharapkan.
6. Gunakan `expect` untuk memeriksa apakah jumlah komponen `UserItem` sesuai dengan jumlah data yang diharapkan & apakah data yang ditampilkan sesuai dengan data yang diharapkan.
```js
/* global global ,describe, it, expect*/
import { mount } from '@vue/test-utils';
import UserList from '@/views/UserList.vue';
import { describe, vi } from 'vitest';
import flushPromises from 'flush-promises';

describe('UserList.vue', () => {
    it('render a list of users after successfull API request', async () => {

        // MOCK API
        const mockUsers = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
        ];

        // Mock the fetch function
        global.fetch = vi.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve(mockUsers),
            })
        })

        const wrapper = mount(UserList);

        await flushPromises();

        const users = wrapper.findAllComponents({ name: 'UserCard' })

        expect(users.length).toBe(2)
        expect(users[0].props('user')).toEqual({ id: 1, name: 'John Doe' })
        expect(users[1].props('user')).toEqual({ id: 2, name: 'Jane Smith' })
    })
})
```

## Form Testing

Step by step untuk melakukan unit testing pada komponen yang melakukan form submission: 
1. Buat file `UserForm.spec.js` di dalam folder `src/tests/unit`.
2. Import & gunakan `mount` dari `@vue/test-utils` untuk merender komponen `UserForm`.
3. Simulasikan input form dengan menggunakan `wrapper.find("input#[id]").setValue` pada elemen input yang ada di dalam komponen sesuai idnya.
4. Import `vi` & gunakan `vi.fn()` dari Vitest untuk membuat mock function yang akan digunakan untuk menggantikan fungsi `fetch` bawaan JavaScript.
5. Simulasikan klik pada tombol submit dengan menggunakan `wrapper.find("form").trigger('submit')` pada elemen form.
6. Pastikan event submit hanya diemit sekali dengan menggunakan `expect(wrapper.emitted().submit).toHaveLength(1)`.
7. Import & gunakan `flushPromises` untuk menunggu semua promise selesai sebelum melakukan assertion.
8. Gunakan `expect` untuk memeriksa apakah event submit sudah diemit dan apakah pesan sukses ditampilkan di dalam komponen.

```js
/* global global, describe, it, expect*/
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import flushPromises from 'flush-promises';
import UserForm from '@/views/UserForm.vue';

describe('UserForm.vue', () => {
    it('submits the form and emits submit event when valid data entered', async () => {
        const wrapper = mount(UserForm);

        const name = "bambang"
        const username = "fufufefe"
        const email = "bambang123@mail.com"

        // Simulation form input
        await wrapper.find('input#name').setValue(name)
        await wrapper.find('input#username').setValue(username)
        await wrapper.find('input#email').setValue(email)

        // Mock the post function
        global.fetch = vi.fn(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    name,
                    username,
                    email
                }),
            })
        })

        // Simulation click submit button
        await wrapper.find('form').trigger('submit')
        // make sure event submit only emitted once
        expect(wrapper.emitted().submit).toHaveLength(1)

        // wait all promise done & update DOM
        await flushPromises();

        // make sure event submit already emitted
        expect(wrapper.emitted()).toHaveProperty('submit')
        expect(wrapper.text()).toContain(`Succeed add new user ${username}`)
    })
})
```