/* global describe, it, expect*/
import { mount } from '@vue/test-utils';
import CounterCard from '@/components/CounterCard.vue';

describe('CounterCard', () => {
    it('renders the component', () => {
        const wrapper = mount(CounterCard);
        expect(wrapper.exists()).toBe(true);
    });

    it('increments the counter when button is clicked', async () => {
        const wrapper = mount(CounterCard);
        const button = wrapper.find('button#increment');

        await button.trigger('click');

        console.log(wrapper.text());
        // console.log(wrapper.html());
        expect(wrapper.text()).toContain('Count : 1');
    });

    it('decrements the counter when button is clicked', async () => {
        const wrapper = mount(CounterCard);
        const button = wrapper.find('button#decrement')

        await button.trigger('click');
        expect(wrapper.text()).toContain('Count : -1');
    });

    it('renders the correct message from prop', () => {
        const wrapper = mount(CounterCard, {
            propsData: {
                message: 'hello world'
            }
        });

        // console.log(wrapper.props('message'));
        expect(wrapper.props('message')).toBe('hello world')
    });
});