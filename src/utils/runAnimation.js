import eventBus from './eventBus'
let i = 0;
export default async function runAnimation($el, animations = []) {
    if (i == 0) $el.classList.add('animate__animated')
    let play = (animation) => {
        $el.classList.add(animation)
        let removeAnimation = () => {
            $el.removeEventListener('animationend', removeAnimation)
            $el.classList.remove(animation)
            if (animations.length != i) {
                eventBus.$emit("runAnimation")
            } else {
                i = 0
            }
        }
        $el.addEventListener('animationend', removeAnimation);
    }
    play(animations[i++])
}