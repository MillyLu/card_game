window.game = {};

window.game.level = localStorage.level;

export default window.game;

declare global {
    interface Window {
        game: any;
    }
}
