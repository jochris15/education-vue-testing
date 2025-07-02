import { mount } from '@vue/test-utils';
import CounterPinia from '@/views/CounterPinia.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('CounterPinia', () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        setActivePinia(createPinia())
    })

    it('renders the component', () => {
        const wrapper = mount(CounterPinia);
        expect(wrapper.exists()).toBe(true);
    });

    it('increments the counter when button is clicked', async () => {
        const wrapper = mount(CounterPinia);
        const button = wrapper.find('button#increment');

        await button.trigger('click');

        console.log(wrapper.text());
        // console.log(wrapper.html());
        expect(wrapper.text()).toContain('CountPinia : 1');
    });

    it('decrements the counter when button is clicked', async () => {
        const wrapper = mount(CounterPinia);
        const button = wrapper.find('button#decrement')

        await button.trigger('click');
        expect(wrapper.text()).toContain('CountPinia : -1');
    });
});