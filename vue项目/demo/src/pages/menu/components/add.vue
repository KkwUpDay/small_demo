<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 菜单名称 -->
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上级菜单 -->
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid">
            <el-option label="------请选择------" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1">目 录</el-radio>
          <el-radio v-model="form.type" :label="2">菜 单</el-radio>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" label-width="120px" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option label="------请选择------" value disabled></el-option>
            <el-option v-for="item  in icons" :key="item" :lable="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单地址 -->
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url">
            <el-option label="------请选择------" value disabled></el-option>
            <el-option v-for="item  in urls" :key="item" :lable="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <!-- 添加按钮 -->
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
  requestMenuAdd,
  requestMenuDetail,
  requestMenuUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
//
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      //   路由得集合
      urls: [
        "/home",
        "/cate",
        "/menu",
        "/goods",
        "/spec",
        "/seckill",
        "/index",
      ],
      //图标的集合
      icons: [
        "el-icon-setting",
        "el-icon-s-grid",
        "el-icon-first-aid-kit",
        "el-icon-bangzhu",
      ],
    };
  },
  methods: {
    //重置内容
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //取消弹框
    cencle() {
      this.info.show = false;
      //点击取消重置
       if(!this.info.isAdd){
          this.empty()
        }
    },
    //添加事件
    add() {
      requestMenuAdd(this.form).then((res) => {
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
    //获取某一条数据
    getDetail(id) {
      console.log(id);
      requestMenuDetail({ id: id }).then((res) => {
        //将json里面的数据赋值给form表单
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    //获取之后要做的事情就是修改页面中的内容
    update() {
      requestMenuUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功")
          this.empty();
          this.cencle();
          this.requestList();
        }else{
          warningAlert(res.data.msg)
        }
      });
    }, 

    ...mapActions({
      requestList: "menu/requestList",
    }),
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  mounted() {},
};
</script>
<style scoped>
</style>