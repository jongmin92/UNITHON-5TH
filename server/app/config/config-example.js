'use strict';

export default {
  url : '',
  options : {
    server : {socketOptions : {keepAlive : 1, connectTimeoutMS : 30000}},
    replset : {socketOptions : {keepAlive : 1, connectTimeoutMS : 30000}}
  }
}
