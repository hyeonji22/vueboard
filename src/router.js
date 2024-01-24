import { createWebHistory, createRouter } from "vue-router";
import boardList from "./components/BoardList.vue";
import write from "./components/write.vue";
import detail from "./components/Detail.vue";
const routes = [
  {
    path: "/",        //목록
    name:boardList,
    component: boardList,

  },
  {
    path: "/board/:page",        //목록페이지
    component: boardList,
  },
  {
    path: "/write",       //글작성
    component: write,
  },
  {
    path: "/write/:id",       //글수정
    component: write,
  },
  {
    path: "/detail/:id/:page",    //상세보기
    component: detail,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 