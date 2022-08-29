# 1. 什么是Head Less CMS

CMS -> Content Management System,字面翻译就是内容管理系统,简单来说就是一个内容编辑和管理发布的管理系统.现在国外流行的CMS有:`Wordpress`，`Drupal`，`Joomla`. 通常都是利用CMS建设网站,制作个人博客.像知乎,B站,掘金这类的网站都需要有一套CMS系统来管理文章和视频内容.

------

HeadlessCMS -> Headless Content Management System, 无头内容管理系统,以`Wordpress`为例,内容在后台管理程序中操作和编辑,显示也由`Wordpress`s上的主题文件管理.显示的前端内容和后端之间的关联性很强密切.而且CMS内容主要还是面向网页的框架,对于跨端的支持不是很理想

而无头CMS中,内容和显示是分开的,无头 CMS 架构会将后端内容功能（例如创建、管理和存储）与前端功能（例如呈现和发布）分离而且无头CMS的数据是基于API的,可以在各个平台上接受数据,更容易扩展到多平台上.

<img src="https://upload-images.jianshu.io/upload_images/1791542-739c7e3f88685d29.png" style="zoom: 50%;" />

<img src="https://upload-images.jianshu.io/upload_images/1791542-5de9ece2bec13734.png" style="zoom:50%;" />

# 2. 代码实现

基本上HeadlessCMS就是制作一个管理系统,在这个系统上编辑和管理文章内容图片内容,发布,然后配置请求路径,用户访问这个路经返回一个内容的JSON文件,

至于如何显示这些内容我们可以提供模板或者让用户自己搭建.



Ghost 后台管理 -> https://github.com/TryGhost/Ghost/tree/main/ghost/admin

Ghost 前端模板 ->https://github.com/TryGhost/Ghost/tree/main/ghost/core/core/frontend

Ghost的后台管理系统是由Web模板系统Handlebars创建的模板,Ghost提供前端模板,用户可以选择内容显示的样子



Strapi 后台管理->  https://github.com/strapi/strapi/tree/main/packages/core/admin

Strapi是使用React做为前端框架,Strapi只提供Api接口,至于前端的内容如何显示需要用户自己搭建

------

strapi开发文档https://getstrapi.cn/developer-docs/latest/getting-started/introduction.html

ghost官网教程https://ghost.org/docs/install/local/

# 3. 菜单和表单的实现

上面说了Ghost使用了Handlebars做为框架,具体是基于[Ember.js](https://guides.emberjs.com/release/) ,是一个js的MVC框架(和Springboot很像),Ghost大量使用了装饰器语法,但是js的装饰器语法并没有加入标准,如果使用装饰器到后面定案后,装饰器语法有修改的话就得全部重构代码.

Ghost的control层代码-> https://github.com/TryGhost/Ghost/tree/main/ghost/admin/app/controllers

Ghost的前端模板代码  -> https://github.com/TryGhost/Ghost/tree/main/ghost/admin/app/templates

Ghost的代码的菜单和表单都是后台配置的,就可以看作是一个springboot项目,不过使用了js实现.

controler -> https://github.com/TryGhost/Ghost/blob/main/ghost/admin/app/controllers/dashboard.js

template -> https://github.com/TryGhost/Ghost/blob/main/ghost/admin/app/templates/dashboard.hbs