<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <!-- =-=============上级分类 ==================-->
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="form.pid">
            <el-option label="----请选择----" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!--========== 动态数据============= -->
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- ----------------分类名称 ------------------->
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!--------------------- 图片 ----------------->
        <el-form-item label="图片" label-width="100px" v-if="form.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--================= 状态=======================-->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  methods: {
    //重置
    empty() {},
    //添加
    add() {},
    //获取其中某一条数据
    geuDetail(id) {
      console.log(id);
    },
    //删除
    cencle() {},
    // 修改
    update() {},
  },
  mounted() {},
};
</script>
<style scoped lang="stylus">
.add >>> .el-upload {
  border: 1px solid #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border: 1px dashed #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>