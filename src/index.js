import App from './App.js'
import './App.style.css'
import './component/common/TextArea.style.css'
import './component/skeletons/DetailContentSkeleton.style.css'
import './component/skeletons/Skeleton.style.css'
import './component/BranchButton.style.css'
import './component/DetailTitle.style.css'
import './component/DocumentBranch.style.css'
import './component/DocumentEmptyBranch.style.css'
import './component/DocumentTree.style.css'
import './page/DetailPage.style.css'
import './page/ErrorPage.style.css'
import './page/HomePage.style.css'

const $app = document.querySelector('#app')

new App({ $target: $app })
