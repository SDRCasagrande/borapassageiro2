import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationType = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight' | 'stagger';

interface ScrollAnimationOptions {
    type?: AnimationType;
    delay?: number;
    duration?: number;
    staggerDelay?: number;
    triggerStart?: string;
}

export function useScrollAnimation<T extends HTMLElement>(options: ScrollAnimationOptions = {}) {
    const ref = useRef<T>(null);
    const {
        type = 'fadeUp',
        delay = 0,
        duration = 0.8,
        staggerDelay = 0.15,
        triggerStart = 'top 90%',
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Set initial state immediately so content is hidden before animation
        const initialStates: Record<AnimationType, gsap.TweenVars> = {
            fadeUp: { opacity: 0, y: 40 },
            fadeIn: { opacity: 0 },
            scaleIn: { opacity: 0, scale: 0.9 },
            slideLeft: { opacity: 0, x: -60 },
            slideRight: { opacity: 0, x: 60 },
            stagger: {},  // Handled per-child
        };

        const toStates: Record<AnimationType, gsap.TweenVars> = {
            fadeUp: { opacity: 1, y: 0, duration, ease: 'power3.out' },
            fadeIn: { opacity: 1, duration, ease: 'power2.out' },
            scaleIn: { opacity: 1, scale: 1, duration, ease: 'back.out(1.4)' },
            slideLeft: { opacity: 1, x: 0, duration, ease: 'power3.out' },
            slideRight: { opacity: 1, x: 0, duration, ease: 'power3.out' },
            stagger: { opacity: 1, y: 0, duration, ease: 'power3.out' },
        };

        if (type === 'stagger') {
            const children = el.children;
            if (children.length > 0) {
                // Set children initial state
                gsap.set(children, { opacity: 0, y: 30 });
                
                gsap.to(children, {
                    ...toStates.stagger,
                    delay,
                    stagger: staggerDelay,
                    scrollTrigger: {
                        trigger: el,
                        start: triggerStart,
                        toggleActions: 'play none none none',
                    },
                });
            }
        } else {
            // Set initial state
            gsap.set(el, initialStates[type]);
            
            gsap.to(el, {
                ...toStates[type],
                delay,
                scrollTrigger: {
                    trigger: el,
                    start: triggerStart,
                    toggleActions: 'play none none none',
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === el) {
                    trigger.kill();
                }
            });
        };
    }, [type, delay, duration, staggerDelay, triggerStart]);

    return ref;
}

// Counter animation hook for statistics
export function useCountUp(endValue: number, duration = 2) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Set initial text
        el.textContent = '0';

        const obj = { value: 0 };

        gsap.to(obj, {
            value: endValue,
            duration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            onUpdate: () => {
                el.textContent = Math.round(obj.value).toLocaleString('pt-BR');
            },
        });
    }, [endValue, duration]);

    return ref;
}
