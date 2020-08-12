class EgretSubPackageLoading extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        EgretSubPackageLoading.instance = this;
        this.bgLoadNum=0;
        this._imgLoader=null;
    }

    onAddToStage() {
        this.loadBg();
    }

    loadBg(){
        if(this.bgLoadNum>4)
        {
            //this.imgLoadHandle();
        }
        else
        {
            if(!this._imgLoader)
            {
                this._imgLoader = new egret.ImageLoader();
                this._imgLoader.addEventListener(egret.Event.COMPLETE, this.imgLoadHandler, this);
                this._imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.loadBg,this);
            }
            // 首屏加载背景图
            this._imgLoader.load("https://lz-wx-cdn.leishengame.com/gt_wx/resource/assets/loginres/loginbg.jpg");
            this.bgLoadNum++;
        }
    }

    setProgress(res, stageNumber) {
        // iOS真机为totalBytesWriten 微信官方将于近期修复 2018.6.19
        if (this.loading) {
            if(stageNumber == 1) {
                this.loading.scaleX = 0.5 * (res.totalBytesWritten || res.totalBytesWriten) / res.totalBytesExpectedToWrite;
            } else {
                this.loading.scaleX = 0.5 + 0.5 * (res.totalBytesWritten || res.totalBytesWriten) / res.totalBytesExpectedToWrite;
              }
        }      
        console.log(res.progress);
    }

    onSuccess() {
        const stage = this.stage;
        stage.removeChild(this);
        EgretSubPackageLoading.instance = null;
        // 创建文档类，开发者需要根据自身项目更改
        const main = new Main();
        stage.addChild(main);
    }
    imgLoadHandler(evt) {
        if(evt)
        {
            let loader = evt.currentTarget;
            let bmd = loader.data;
            //创建纹理对象
            let texture = new egret.Texture();
            texture.bitmapData = bmd;
            let bmp = new egret.Bitmap(texture);
            bmp.x = egret.MainContext.instance.stage.stageWidth / 2 - bmp.width / 2;
            bmp.y = egret.MainContext.instance.stage.stageHeight / 2 - bmp.height / 2;
            this.addChild(bmp);
            // loading底
            var loadingBg = new egret.Shape();
            loadingBg.graphics.beginFill(0x001219);
            loadingBg.graphics.drawRect(0, 0, 516, 10);
            loadingBg.graphics.endFill();
            loadingBg.x = egret.MainContext.instance.stage.stageWidth / 2 - loadingBg.width / 2;
            loadingBg.y = egret.MainContext.instance.stage.stageHeight / 2 + bmp.height * 0.4 - loadingBg.height / 2;
            this.addChild(loadingBg);
    
            // loading
            var loading = new egret.Shape();
            loading.graphics.beginFill(0xfcf3b4);
            loading.graphics.drawRect(0, 0, 512, 6);
            loading.graphics.endFill();
            loading.x = egret.MainContext.instance.stage.stageWidth / 2 - loading.width / 2;
            loading.y = egret.MainContext.instance.stage.stageHeight / 2 + bmp.height * 0.4 - loading.height / 2;
            this.loading = loading;
            this.addChild(loading);
        }

    }
}

window.EgretSubPackageLoading = EgretSubPackageLoading;