<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!---------------- 活动名称 ---------------->
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!---------------- 活动期限 ---------------->
        <el-form-item label="活动期限" label-width="120px">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        {{value1}}

        <!---------------- 一级分类 ---------------->
        <el-form-item label="一级分类" label-width="120px">
          <!-- @change="changeFirstCateId" 点击一级分类获取二级分类 -->
          <el-select v-model="form.first_cateid" @change="changeFirstCateId">
            <el-option label="请选择分类" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!---------------- 二级分类 ---------------->
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择分类" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!----------------  商品 ---------------->
        <el-form-item label="商品" label-width="120px">
          <el-select v-model="form.goodsid">
            <el-option label="请选择商品" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!---------------- 状态 ---------------->
        <el-form-item label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <!------------------ 添加按钮 ----------------->
        <el-form-item label label-width="120px">
          <el-button type="primary" @click="cencle">取 消</el-button>
          <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
//引入
import {
  requestSeckillAdd,
  requestSeckillDetail,
  requestSeckillUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
//
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "seckill/list",
      //分类的一级列表
      cateList: "cate/list",
      //商品列表
      goodsList: "goods/list",
    }),
  },
  components: {},
  data() {
    return {
      value1:[],
      //二级分类的数组
      secondCateArr: [],
      form: {
        
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
    };
  },
  methods: {
    //重置内容
    empty() {
      //二级分类的数组
      this.secondCateArr = [];
      this.form = {
        
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.value1 = [];
    },
    //取消弹框
    cencle() {
      this.info.show = false;
      //点击取消重置
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加事件
    add() {
      this.form.begintime=this.value1[0].getTime()
      this.form.endtime=this.value1[1].getTime()
      requestSeckillAdd(this.form).then((res) => {
        console.log(this.form);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //删除弹框
          this.cencle();
          //清空弹框的数据
          this.empty();
          //再次获取请求数据刷新
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //---------------点击一级分类获取二级分类--------------
    changeFirstCateId() {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateArr = this.cateList[index].children;
      this.form.second_cateid = "";
      console.log(this.secondCateArr);
    },

    //获取某一条数据
    getDetail(id) {
      console.log(id);
      requestSeckillDetail({ id: id }).then((res) => {
        //将json里面的数据赋值给form表单
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    //获取之后要做的事情就是修改页面中的内容
    update() {
      requestSeckillUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cencle();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    ...mapActions({
      requestList: "seckill/requestList",
      //分类一级列表需要请求cate的数据
      requestCateList: "cate/requestList",

      //获取规格列表
      requestSpecList: "spec/requestList",
      //获取商品列表
      requestGoodstList: "goods/requestList",
    }),
  },
  mounted() {
    this.requestCateList();
    this.requestSpecList();
    this.requestGoodstList();
  },
};
</script>
<style scoped>
</style>