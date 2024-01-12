import Component from '../core/Component.js'

export default class HomePage extends Component {
  template() {
    return `
      <div class="home-page">
        <h1>Welcome!</h1>
        <h3 class="home-subtitle">프로젝트 제작기</h3>
        <div class="home-link-container">
          <a href="https://medium.com/@4538asd/%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EC%8B%9C%EC%8A%A4%ED%85%9C-with-vanila-js-85e4b72406f7">(1) 바닐라 JS로 상태관리 시스템 만들기</a>
        </div>
        <div class="home-link-container">
          <a href="https://medium.com/@4538asd/redux-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%A1%9C-%EC%A0%84%EC%97%AD-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0-with-vanila-js-83c78cb33d88">(2) 바닐라 JS로 상태관리 시스템 개선하기</a>
        </div>
        <h3 class="home-subtitle">Source Code</h3>
        <div class="home-link-container">
          <a href="https://github.com/hyesung99/Notion-Clone">Notion Clone Github</a>
        </div>
      </div>
    `
  }
}
