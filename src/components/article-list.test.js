import React from 'react'
import Enzyme, { render, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ArticleListWithAccordion, { ArticleList } from './article-list'
import articles from '../fixtures'

Enzyme.configure({ adapter: new Adapter() })

describe('ArticleList', () => {
  it('should add 2 and 2', () => {
    expect(2 + 2).toEqual(4)
  })

  it('should render items', () => {
    const container = shallow(
      <ArticleList articles={articles} toggleOpenItem={() => () => {}} />
    )

    expect(container.find('.test--article-list__item').length).toEqual(
      articles.length
    )
  })

  it('should render all closed articles by default', () => {
    const container = render(<ArticleListWithAccordion articles={articles} />)

    expect(container.find('.test--article__body').length).toEqual(0)
  })

  it('should open article on click', () => {
    const container = mount(<ArticleListWithAccordion articles={articles} />)

    expect(container.find('.test--article__body').length).toEqual(0)

    container
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    expect(container.find('.test--article__body').length).toEqual(1)
  })

  it('should should fetch data on mount', () => {
    let functionIsCalled = false
    mount(
      <ArticleList
        articles={[]}
        fetchData={() => (functionIsCalled = true)}
        toggleOpenItem={() => () => {}}
      />
    )

    expect(functionIsCalled).toBe(true)
  })

  it('should close an article', (done) => {
    const wrapper = mount(<ArticleListWithAccordion articles={articles} />)
    expect(wrapper.find('.test__article--body').length).toEqual(0)

    wrapper
      .find('.test--article__btn')
      .at(0)
      .simulate('click')
    expect(wrapper.find('.test--article__body').length).toEqual(1)

    wrapper
      .find('.test--article__btn')
      .at(0)
      .simulate('click')

    setTimeout(() => {
      try {
        wrapper.simulate('transitionEnd')

        expect(wrapper.find('.test--article__body').length).toEqual(0)
        done()
      } catch (err) {
        done.fail(err)
      }
    }, 800)
  })
})
