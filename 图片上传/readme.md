#### 上传图片和上传文件夹



### 上传图片

* 点击上传 通过 event.target.files 获取目标文件。然后处理文件 配合一系列事件 来处理

* 如果拖拽 event.dataTransfer.files 获取拖拽的目标

代码后续补上





### 上传文件夹



* 拖拽文件夹
* 手动点击上传文件夹 
  * <input type="file" multiple="" webkitdirectory="">  



拖拽上传 使用 webkitGetAsEntry 目前支持webkit内核 chrome不支持

可以使用dropzone 他不知道怎么兼容的。

```javascript
let upload = document.getElementById('upload');

	upload.addEventListener('dragover', handleUpload, false);
	upload.addEventListener('drop', handleUpload, false);

	function handleUpload(event) {
		event.preventDefault();
		if (event.type === 'drop') {
			let items = event.dataTransfer.items;
			let i = 0, length = items.length;
			while(i < length) {
				let item = items[i] && items[i].webkitGetAsEntry();
				if (item && item.isDirectory) {
					// 如果是文件夹
					readDirectory(item);
				}
				i++;
			}
		}
	}
	function readDirectory(directory) {
		let fileReader = directory.createReader();
		const result = [];
		let doBatch = function doBatch() {
			// 批次读取
			console.log(fileReader);
			// 这里就不支持了
			fileReader.readEntries(entries => {
				console.log(2, entries);
				if (entries.length) {
					return;
				}
				entries.forEach(e => {
					if (e && e.isDirectory) {
						readDirectory(e);
					}
				});
				doBatch();
			});
		}
		doBatch();
	}
```

