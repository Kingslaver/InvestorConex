'use strict';

/**
 * @ngdoc service
 * @name afwebappApp.Message
 * @description
 * # Messgae Model
 * Model in the afwebappApp.
 */
angular.module('afwebappApp').factory('Blog', ['$http', 'CommonUrlFactory', 'BaseFactory',
  function ($http, CommonUrlFactory, BaseFactory) {
      function Blog(data) {

          if (data) {
              this.setData(data);
          }
      };
      var url = CommonUrlFactory.getBlogsUrl(); //'http://128.199.147.97/api/users/mymessages/';
      Blog.prototype = {

          setData: function (data) {
              angular.extend(this, data);
          },
          getBlogs: function (Id) {
             // alert('get Blog');
              var list = [];
              if (Id != undefined) {
                  BaseFactory.getData(url+'/' + Id).success(function (data) {
                      angular.extend(list, data[0]);
                      console.log(list);
                  }).error(function (error) {
                      alert('error');
                      console.log(error);
                  });
              }
              return list;
            
             
          },
          getBlogPost: function (Id) {
           //   alert('get Blog Post');
              //var list = [];
              //if (Id != undefined) {
              //    BaseFactory.getData(url + Id).success(function (data) {
              //        angular.extend(list, data[0]);
              //        //console.log(data[0]);
              //    });
              //}
              //return list;
          },
          addBlog: function () {
            //  alert('folioId: ' + this.folio.folioId + ', BlogTitle: ' + this.blogName + ', Description: ' + this.blogDescription);
              console.log( this);
              var list = [];
              BaseFactory.postData(url, this).success(function (data) {
                  alert('Successfully Saved');
                  angular.extend(list, data);
                  console.log(list);
              }).error(function (error) {
                  alert('error');
                  console.log(error);
              });
              return list;
          },
          addBlogPost: function (blogId) {
             // alert('blogId: ' +blogId + ', postTitle: ' + this.postTitle + ', postContent: ' + this.postContent);
              var list = {};
              BaseFactory.postData(url + '/' + blogId, this).success(function (data) {
                  alert('success');
                  angular.extend(list, data);
                  console.log(list);
              }).error(function (error) {
                  alert('error');
                  console.log(error);
              });
              return list;
          },
          deleteBlog: function () {
            //  alert('delete blog');
          },
          deleteBlogPost: function () {
             // alert('delete blog post');
          },
          getAllPosts: function (blogId) {
              var list = [];
              BaseFactory.getData(url + '/' + blogId).success(function (data) {
                  angular.extend(list, data);

              }).error(function(error){
				  alert('error');
				  console.log(error);
			  });
              return list;
            //  alert('get all post');
          }

      };



      return Blog;
  }]);



