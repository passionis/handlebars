# handlebars

安装使用hbs 

[handlebars下载地址]: http://builds.handlebarsjs.com.s3.amazonaws.com/bucket-listing.html?sort=lastmod&amp;sortdir=desc	"下载地址"

## 理解

个人理解：handlebars实际上就是在js的代码中写逻辑获取数据等，在hbs的文件中定义html界面渲染数据 。

## 语法

### 定义hbs的语句块

```handlebars
    <script id = "hbs_id" type="text/x-handlebars-template">
        
    </script>
```

### 插值

```handlebars
   <script id = "hbs_id" type="text/x-handlebars-template">
        <p>{{title}}</p>
    </script>
```

### 注释

`{{! 注释信息 }}`

### 遍历循环

```handlebars
    <script type="text/x-handlebars-template" id="hbs_id">
         <p>{{title}}</p>
       <ul>
            <!-- js的注释信息 -->
            {{!注释信息}}
            {{#each arr}}
                <li>{{this}}</li>
                {{/each}}
            </ul>
    </script>
```

- 这里的this 是根据环境变量的  具体代表那个数据需要根据上下文判断,

- 在循环遍历的时候，里面的li 标签只能获取到数组中的元素，但是实际开发中可能还需要数组以外的数据

 ```handlebars
    <script type="text/x-handlebars-template" id="hbs_id">
         <ul>
              {{#each arr}}
                  <li>{{../per.age}}+++++{{this}}</li>
              {{/each}}
          </ul>
      </script>
 ```

```javascript
 var data = {
            title: "图表",
            arr: [
                1, 2, 3, 4
            ],
            per:{
                name:"臧三",
                age:254
            }
        };
```

  这里面的../ 表示当前上下文环境中（这里就是arr的每一项）的上一级,和文件的路径表达方式类似

- 获取对应角标方法

  <div>
  	{{@index}}
  </div>



### 编译渲染

```javascript
  <script>
        var hbs = $("#hbs_id");
        var content = hbs.html();
        var template = Handlebars.compile(content);
        var data = {
            title: "图表",
            arr: [
                1, 2, 3, 4
            ]
        };
        var html = template(data);
        console.log(html);
        $("#div").html(html);
   </script>这
```

这里是搭配这jquery.js 使用  

- ` var content = hbs.html();`这行代码实际是获取我们定义的hbs模板

  |                                                              |
  | ------------------------------------------------------------ |
  | <p>{{title}}</p><br/>       <ul><br/>            <!-- js的注释信息 --><br/>            {{!注释信息}}<br/>            {{#each arr}}<br/>                <li>{{this}}</li><br/>                {{/each}}<br/>            </ul> |

- `var template = Handlebars.compile(content);`这行实际是把上面的hbs模板生成一个函数

  |                                                              |
  | ------------------------------------------------------------ |
  | ƒ ret(context, execOptions) {<br/>	    if (!compiled) {<br/>	      compiled = compileInput();<br/>	    }<br/>	    return compiled.call(this, context, execOptions);<br/>	  } |

- `   var html = template(data);`这行代码就是上面方法的执行结果

  |                                                              |
  | ------------------------------------------------------------ |
  | <p>图表</p><br/>       <ul><br/>            <!-- js的注释信息 --><br/>                <li>1</li><br/>                <li>2</li><br/>                <li>3</li><br/>                <li>4</li><br/>            </ul> |

- `   $("#div").html(html);`就是把生成的HTML代码加载到指定html 的标签中

####   Handlebars.registerHelper方法自定义helper

1. 块helper

   ```javascript
   
       // 自定义helper 处理equal判断逻辑
       // 参数一：自定义helper的名称，
       // 参数二：定义function 方法的参数 就是在hbs页面中{{#equal v1 v2}}，
       // 如果只有一个v1的话 function函数定义的形参数就是1个
       // function 的第二个参数options  如果定义的是块helper就需要传递该参数  options是一些配置项
       Handlebars.registerHelper("equal", function (v1, v2, options) {
           if (v1 == v2) {
               //fn 是个函数 函数执行的结果就是编译的结果
               return options.fn(this);
           } else {
               //inverse 就是取反 对应hbs模板中的{{#else}}
               return options.inverse(this);
           }
       });
   ```

   

2. 行helper

   Handlebars.registerHelper()返回值会替代{{...}}中的类容

