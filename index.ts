import { setChildren, INode } from './manipulation'
import { render } from './render'
import type { Render } from '../utils/types'

/**
 * Mounts the application
 * @param template the template to render to `root`
 * @param root the root element to render `template` to
 * @returns an object to update and shut down the view.
 */
export function mount(template: Render, root: HTMLElement) {
    let rerender = () => {}, children: INode[] = []
    const rendered = render(template, [], () => rerender())
    rerender = () => {
        const newChildren = rendered.render()
        setChildren(root, children, newChildren)
        children = newChildren
    }
    rerender()
    return {
        update() {
            rerender()
        },
        unmount() {
            rerender = () => {}
            rendered.unmount()
            setChildren(root, children, [])
        },
    }
}