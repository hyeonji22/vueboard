<template>

<div class="input-group mb-3">
  <select v-model="searchType" class="form-select" aria-label="Default select example">
    <option  value="A">전체</option>
    <option value="T">제목</option>
    <option value="W">작성자</option>
</select>

  <input @keyup.enter="getBoardSearchList" v-model="keyword" ref="keyword" type="text" class="form-control"  placeholder="검색어를 입력하세요" aria-label="Username" aria-describedby="basic-addon1">
  <button type="button" class="btn btn-primary"  @click="getBoardSearchList">검색</button>
</div>

<button type="button" :boardList="boardList" @click="$router.push('/write')" class="btn btn-outline-success " >글작성</button>
<h5>게시글수 : {{totalCnt}}</h5>

 <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">제목</th>
      <th scope="col">작성자</th>
      <th scope="col">날짜</th>
    </tr>
  </thead>

 
    <tr  v-if="boardList.length == 0" >
      <td colspan="5" style=" padding: 100px;">검색된 내용이 없습니다 </td>
    </tr>

  <tbody v-else v-for="(board, i) in boardList" :key="i"  @click="$router.push(`/detail/${board.id}/${currentPage}`)">
    <tr >
      <th  scope="row">{{ totalCnt - (i + (currentPage - 1) * 10) }}</th>
      <td>{{board.title}}</td>
      <td>{{board.writer}}</td>
      <td>{{ board.updatedate ? board.updatedate.replace('T', ' ').split('.')[0] : '' }}</td>
    </tr>
 
  </tbody>
</table>


<!-- 페이징 시작 -->
 <nav aria-label="Page navigation example" class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item" v-if="pageMaker.prev"  @click="goToPage(this.pageMaker.startPage -1)"><a class="page-link" href="#">이전</a></li>
      <li class="page-item" v-for="page in pageMaker.pageNumberArr" :key="page.id" >
        <a class="page-link" @click="goToPage(page)" :class="page == pageMaker.currentPage? 'active': ''" href="#">{{page}}</a>
      </li>
      <li class="page-item" v-if="pageMaker.next" @click="goToPage(this.pageMaker.endPage +1)"><a class="page-link" href="#">다음</a></li>
    </ul>
  </nav> 
<!-- 페이징 끝 -->




</template>

<script>
import axios from 'axios';

export default {
    // eslint-disable-next-line
    name: 'BoardList',
    data() {
        return {
          boardList :[],
          searchType :this.$store.state.searchType , 
          keyword : this.$store.state.keyword, 
          totalCnt: 0,
          currentPage: 1,
          pageMaker: {},
        };
    },
    mounted() {
      this.currentPage = this.$route.params.page || 1;
      this.getBoardList();
    },
    methods: {
      //검색
      getBoardSearchList(){
        this.currentPage = 1; //검색시, 페이지 1로 초기화
        this.getBoardList();  //목록 호출
        this.$store.commit('setKeyword', this.keyword);
        this.$store.commit('setSearchType', this.searchType);
      },
      //목록
      getBoardList(){
         axios.get(`/api/board/${this.currentPage}`,{   
          params: {
            keyword: this.keyword,
            searchType: this.searchType
          },
        })
        .then(res=>{
          this.boardList = res.data.boardList;
          this.totalCnt = res.data.totalCnt;
          this.pageMaker = res.data.pageMaker;           
        });

      },
      //페이징 이동
       goToPage(page) {
        this.currentPage = page;
        this.getBoardList(); 
      },

        
    },

};
</script>

<style>

</style>