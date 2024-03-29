// 引入
import { Application } from 'typings/app';
import NodeMediaServer from 'node-media-server';
class AppBootHook {
  private app:Application;
  constructor(app: Application) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // 例如：参数中的密码是加密的，在此处进行解密
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 启动流媒体
    if (!this.app.nms) {
      this.app.nms = new NodeMediaServer(this.app.config.mediaServer);
      this.app.nms.run();

      this.app.nms.on('preConnect', (id, args) => {
        console.log('[preConnect]', `id=${id} args=${JSON.stringify(args)}`);
        // let session = nms.getSession(id);
        // session.reject();
      });

      this.app.nms.on('postConnect', (id, args) => {
        console.log('[postConnect]', `id=${id} args=${JSON.stringify(args)}`);
      });

      this.app.nms.on('doneConnect', (id, args) => {
        console.log('[doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
      });

      this.app.nms.on('prePublish', (id, StreamPath, args) => {
        console.log('[prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
        // let session = nms.getSession(id);
        // session.reject();
      });

      this.app.nms.on('postPublish', (id, StreamPath, args) => {
        console.log('[postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
      });

      // 停止推流
      this.app.nms.on('donePublish', async (id, StreamPath, args) => {
        const s = StreamPath.split('/');
        const key = s[2];

        const res = await this.app.model.Live.findOne({
          where: { key },
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (res && res.status !== 2) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
          res.status = 3;
          await res.save();
        }

        console.log('[donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
      });

      this.app.nms.on('prePlay', (id, StreamPath, args) => {
        console.log('[prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
        // let session = nms.getSession(id);
        // session.reject();
      });

      this.app.nms.on('postPlay', (id, StreamPath, args) => {
        console.log('[postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
      });

      this.app.nms.on('donePlay', (id, StreamPath, args) => {
        console.log('[donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
      });
    }


  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用

    // 例如：从数据库加载数据到内存缓存
    //   this.app.cacheData = await this.app.model.query(QUERY_CACHE_SQL);
  }

  async didReady() {
    // 应用已经启动完毕

    //   const ctx = await this.app.createAnonymousContext();
    //   await ctx.service.Biz.request();
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

    //   this.app.server.on('timeout', socket => {
    //     // handle socket timeout
    //   });
  }
}

module.exports = AppBootHook;
