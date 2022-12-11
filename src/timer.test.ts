import { tick } from './scripts/timer';
describe('tick', () => {
    it('should tick tock', () => {
        let seconds = 65;
        let minutes = 0;
        tick();
        expect(seconds).toEqual(65);
    });
});
