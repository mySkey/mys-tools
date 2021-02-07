# 工具库

记录平时经常使用的函数，三方库，共用样式等等

```
mys-tools
├── package.json
├── index.js 函数库的入口
├── README.md 说明文档
├── css
|   └── index.css
└── utils
    ├── lodash
    │   ├── index.d.ts
    │   └── index.js
    └── dayjs
        ├── index.d.ts
        └── index.js
```

### 引用共用样式

```js
import 'mys-tools/css/index.css'
```

### 引用公用函数

```js
import mysTools from 'mys-tools'
mysTools.isDataType('hello world')
```

### 引用常用三方库

```js
import dayjs from 'mys-tools/utils/dayjs'
```