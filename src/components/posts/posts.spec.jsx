import { render, screen } from "@testing-library/react"
import { Posts } from "./posts"


const props = [
    {
        title: 'Title 1', 
        body: 'body 1',
        id: 1,
        cover: 'img/img1.png'
    },
    {
        title: 'Title 2', 
        body: 'body 2',
        id: 2,
        cover: 'img/img2.png'
    },
    {
        title: 'Title 3', 
        body: 'body 3',
        id: 3,
        cover: 'img/img3.png'
    }
]

describe('<Posts />', () => {
    it('should render posts', () => {
        render(<Posts {...props} />)

        expect(screen.getAllByRole('heading', { name: /title/i}))
            .toHaveLength(3)
        expect(screen.getAllByRole('img', { name: /title/i}))
            .toHaveLength(3)
        expect(screen.getAllByRole(/title/i))
            .toHaveLength(3)
        expect(screen.getAllByRole('img', { name: /title 3/i}))
            .toHaveAttribute('src', 'img/img3.png')
    })

    it('should not render posts', () => {
        render(<Posts {...props} />)
        expect(screen.queryAllByRole('heading', { name: /title/i }))
            .not.toBeInTheDocument()
    })

    it('should match snapshot', () => {
        const { container } = render(<Posts {...props} />)
        expect(container.firstChild).toMatchSnapshot()
    })
})