
export default async function runAnimation($el, animations = [],number) {
    if (number == 0) $el.classList.add('animate__animated')
    let play = (animation) => {
        $el.classList.add(animation)
        let removeAnimation = () => {
            $el.removeEventListener('animationend', removeAnimation)
            $el.classList.remove(animation)
            if (animations.length != number) {
                runAnimation($el, animations, number)
            } else {
                animations.forEach(item =>{
                    $el.classList.remove(item)
                })
            }
        }
        $el.addEventListener('animationend', removeAnimation);
    }
    play(animations[number++])
}