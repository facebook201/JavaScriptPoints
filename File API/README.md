### input type = file

首先来说input type="file" （用来处理文件的方式）。 由于默认的样式比较丑 先来说说怎么美化它。这里我有两种方式 

* 第一种 通过label for 和 input的id关联起来

  ```html
      <label for="upload" class="upload-label">
        上传图片
        <i class="icon-upload"></i>
        <input type="file" name="file" id="upload" class="v-upload__input" ></input>
      </label>
  ```

  再设置 input position absolut margin-left -9999px 通过美化

* 第二种 通过设置 input 为display none 然后通过外部元素 触发 input change事件 来达到上传效果



```vue

```





### File API



**File API 是在表单中的文件输入字段的基础上。添加了一些直接访问文件信息的接口 H5为DOM中的文件输入添加了一个files集合 通过文件输入字段选择了一个或多个文件时 files集合包含一组File对象。 每个File对象对应着一个文件 每个File对象都有下列只读属性**



