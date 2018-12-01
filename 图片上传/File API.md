#### File API



在表单中文件输入字段的基础上。H5在DOM中为文件输入元素添加了一个files集合。 在通过文件输入选择一个或多个文件时 files 集合中将包括一组File对象。 有以下只读属性。



* name 本地文件系统中的文件名
* size 文件的字节大小
* type 字符串 文件MIME类型
* lastModifiedDate 字符串 文件上一次被修改的时间。





#### FileReader 类型

Filereader 是异步文件读取机制。 它读取的文件系统。



* readAsText(file, encoding) 以纯文本形式读取文件 将读取到的文件保存在result属性中。
* readAsDataURL(file) 读取文件并将文件以数据URI的形式保存在result中。
* readAsBinaryString(file) 读取文件并将一个字符串保存在result中。字符串中每一个字符表示一字节。
* readAsArrayBuffer(file) 读取文件并将一个包含文件内容的ArrayBuffer 保存在result中



读取过程是异步的。 FileReader 提供了几个事。其中最有用的三件事是progress error load 分别表示是否有读取新数据。 没过50ms 会触发一次progress事件。 通过事件对象会获得与XHR的progress事件相同的信息。 lengthComputable loaded total。

**如果想中断就调用 abort **



```javascript
	triggerUploadPic.addEventListener('change', function(event){
		let files = event.target.files;
		let i = 0, len = files.length;
	
		let reader = new FileReader();
		while(i < len) {
			if (/image/.test(files[i].type)) {
				reader.readAsDataURL(files[i]);
			}
			reader.onload = function() {
				console.log(reader.result);
			};
			reader.onprogress = function(event) {
				console.log(event);
			};
			i++;
		}
	}, false);
```





#### 读取部分内容

Bolb 的 slice方法。





#### 对象URL

这个方法也可以读取文件 图片信息。直接返回图片地址。而不用像FileReader一样先new一个对象。

```javascript

	triggerUploadPic.addEventListener('change', function(event){
		let files = event.target.files;
		let i = 0, len = files.length;

		while(i < len) {
			if (/image/.test(files[i].type)) {
				// URL.createObjectURL 读取直接返回地址
				let url = URL.createObjectURL(files[i]);
				console.log(url);
			}

			i++;
		}
	}, false);
```





#### 25.4.4 读取拖放的文件





####  21.2.1 FormData 

表单数据序列化。在XHR2中定义了FormData类型。它是为序列化表单以及创建与表单相同格式的数据（用于通过XHR传输）提供了遍历。 

```javascript

let  data = new FormData();
data.append('name', 'zhansgan');


```

formData的方便之处在于不用明确地在XHR对象上设置请求头部。 XHR对象能识别传入的数据类型是FormData的实例。 



#### 25.4.5 使用 XHR上传文件





XHR有个upload方法 返回一个XMLHttpRequest对象。表示上传的进度。这个对象无法访问 可以通过upload对象上的事件监听器

* onloadstart 	获取开始

* onprogress    数据传输中

* onabort         获取操作终止

* onerror         获取失败

* onload           获取成功

* onloadend    获取完成


```javascript

/**
 * 获取失败返回的错误信息
 */
function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }
}

/**
 * 获取成功返回的成功信息
 */
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    retur JSON.parse(text);
  } catch(e) {
    return text;
  }
}

/**
 * @param option 上传要带的参数 包括url file相关信息
 */
export default function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }
  
  const xhr = new XMLHttpRequest();
  // action 接口请求的地址
  const action = option.action;
  
  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.precent = e.loaded / e.total * 100;
      }
      // 返回结果给option的 进度函数参数
      option.onProgress(e);
    };
  }

  // 创建一个formdata 序列化传
  const formdata = new FormData();
  // 上传是附带的额外参数
  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formdata.append(key, option.data[key]);
    });
  }
  
  console.log(option);

  formdata.append(option.filename, option.file, option.file.name);

  // 获取失败
  xhr.onerror = function(e) {
    option.onError(e);
  };

  // 获取成功
  xhr.onload = function() {
    // 图片上传成功的状态码都在 200~300
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    // 成功则返回 body信息
    option.onSuccess(getBody(xhr));
  };

  xhr.send(formdata);

  // 处理跨越的时候支持cookie凭证 如果传了这个参数为真 且 xhr支持该属性
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.header || {};
  // 设置上传请求的头部信息
  for (let item in headers) {
    // 自有属性且不是null
    if (headers.hasOwnProperty(item) && headers[item] !== null ) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
}
```





















