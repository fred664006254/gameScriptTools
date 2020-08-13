class SceneEffect extends BaseDisplayObjectContainer 
{   

    private _keys:string[] = [];
    private _sceneId:string = null;
    private _personTab:any[] = [];
    private _bgResGroupName:string = null;
    private _isResLoaded:boolean=false;
    public sceneType:string = null; // 1 , 2 ,3 ,4 这种type

    private _bone:BaseLoadDragonBones = null;

    public constructor() 
	{
		super();
	}

    public showSceneEffect(key:string,sceneId:string="202"):void
    {   
        if (sceneId != "202" && sceneId != "303")
        {
            key = "1";
        }
        if (key == this.sceneType && this._sceneId == sceneId )
        {
            return;
        }


        this.hideSceneEffect();
        

        this._keys = Config.SceneeffectCfg.getShowCfg(key,sceneId);
        this._sceneId = sceneId;
        this.sceneType = key;

        let resArray:string[] = [];
        for (let i = 0 ; i<this._keys.length; i++)
        {
            let names:string[] = this._keys[i].split("_");
            resArray.push("scene_ef_"+names[0]);
        }

        if (sceneId == "204")
        {
            resArray.push("scene_ef_204");
        }
        if (sceneId == "105")
        {
            resArray.push("scene_bone_105_tex_png");
        }
        if (sceneId == "106")
        {
            resArray.push("scene_bone_106_tex_png");
        }
        if(resArray.length){
            this._bgResGroupName = ResourceManager.loadResources(resArray,[],this.loadCompleteHandler,null,this);
        }
    }

    public showCommonSceneEffect(sceneId:string):void
    {   
        if (sceneId == `` || this._sceneId == sceneId){
            return;
        }
        this.hideSceneEffect();
        this._sceneId = sceneId;
        let cfg = Config.SceneeffectCfg.getCommonCfg(sceneId);

        let resArray:string[] = [];
        for(let i in cfg){
            let name = i;
            let unit = cfg[i];
            //帧动画
            if(unit.frameNum){
                for(let j = 1; j <= unit.num; ++ j ){
                    let lampCfg = unit[j];
                    let clip = ComponentManager.getCustomMovieClip(name, unit.frameNum, unit.frameTime);
                    clip.setPosition(lampCfg.x, lampCfg.y);
                    clip.setScale(lampCfg.scale);
                    this.addChild(clip);
                    clip.playWithTime(-1);
                    if (unit.isAdd)
                    {
                        clip.blendMode = egret.BlendMode.ADD;
                    }
                }
            }
            else{
                for(let j = 1; j <= unit.num; ++ j ){
                    let lampCfg = unit[j];
                    let img = BaseBitmap.create(name);
                    img.setPosition(lampCfg.x, lampCfg.y);
                    img.setScale(lampCfg.scale);
                    this.addChild(img);
                    img.alpha = 0;

                    egret.Tween.get(img, {loop : true}).to({alpha : 1}, 3000).to({alpha : 0}, 3000);
                }
            }
        }
    }

    private loadCompleteHandler():void
	{
        this._isResLoaded=true;

        for (let i = 0 ; i<this._keys.length; i++)
        {
            let person:ScenePerson = new ScenePerson();
            person.init(this._keys[i],this._sceneId);
            this.addChild(person);
            this._personTab.push(person);
        }

        if ( Config.SceneeffectCfg.hasSceneBone(this.sceneType, this._sceneId))
        {   
            let animName = Config.SceneeffectCfg.getBoneCfg(this.sceneType,this._sceneId);
            let boneName = animName+"_ske";

            let isDragon = (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon();
            if (isDragon)
            {   
                this._bone = App.DragonBonesUtil.getLoadDragonBones(animName);
                if (this._sceneId == "303" &&  this.sceneType == "2")
                {
                    this._bone.setPosition(0 , 1136);
                }
                else if(this._sceneId == "105")
                {
                    this._bone.setPosition(0 , GameConfig.stageHeigth);
                }
                else if(this._sceneId == "106")
                {
                    this._bone.setPosition(0 , GameConfig.stageHeigth-1136);
                }
                else
                {
                    this._bone.setPosition(GameConfig.stageWidth/2 , 1136/2);
                }
                this.addChild(this._bone);
            }
        }

        if (this._sceneId == "204")
        {
            this.showNightEffect();
        }
    }

    public hideSceneEffect():void
    {
        if (this._personTab.length>0)
        {
            for (var k1 in this._personTab) {
                var v1 = this._personTab[k1];
                egret.Tween.removeTweens(v1);
                v1.dispose();
            }
        }
        this._personTab.length = 0;
        this._keys = [];
        this.sceneType = null;

        if (this._bone)
        {
            this._bone.dispose();
            this._bone = null;
        }

        if(this._isResLoaded)
		{
			if(this._bgResGroupName)
			{
				ResourceManager.destroyRes(this._bgResGroupName);
				this._bgResGroupName=null;
			}
			this._isResLoaded=false;
		}
    }

    private nightcfg ={
        glow : [
            //1
            {type:1,p:{x:303.9,y:770},t:[0,0.67,0.67],a:[0,1,0], s:[1,1.23,1]},
            {type:1,p:{x:322.75,y:765.5},t:[0,0.67,0.67],a:[0,1,0], s:[1,1.23,1]},
            {type:1,p:{x:543.65,y:512.4},t:[0,0.67,0.67],a:[0,1,0], s:[1,1.23,1]},
            //2
            {type:2,p:{x:402,y:636.25},t:[0,0.27,0.66,0.39],a:[0.6,1,0,0.6], s:[1.14,1.23,1,1.14]},
            {type:2,p:{x:402,y:625.15},t:[0,0.27,0.66,0.39],a:[0.6,1,0,0.6], s:[1.14,1.23,1,1.14]},
            //3
            {type:3,p:{x:466,y:666.65},t:[0,0.27,0.66,0.39],a:[0.4,0,1,0.4], s:[1.09,1,1.23,1.09]},
            {type:3,p:{x:466.75,y:655.65},t:[0,0.27,0.66,0.39],a:[0.4,0,1,0.4], s:[1.09,1,1.23,1.09]},
            //4
            {type:4,p:{x:158.25,y:586.15},t:[0,0.67,1.33],a:[1,0,1], s:[1.23,1,1.23]},
            {type:4,p:{x:222,y:573.9},t:[0,0.67,1.33],a:[1,0,1], s:[1.23,1,1.23]},
        ],
        light:[
            {pic:1,type:1,p:{x:134,y:251},t:[0,0.77,2.27,3],a:[0.5,1,0,0.5],sx:null,sy:null},
            {pic:2,type:2,p:{x:134,y:251},t:[0,1.5,3],a:[1,0,1],sx:null,sy:null},
            {pic:3,type:2,p:{x:134,y:251},t:[0,1.5,3],a:[0,1,0],sx:null,sy:null},
            {pic:4,type:3,p:{x:188,y:272},t:[0,0.37,0.7,1.03,2.03,3],a:[0,0,0.5,0.7,0,0],sx:[0.2,0.2,0.2,0.2,0.5,0.5],sy:[0.7,0.7,0.7,1,1,1]},
            {pic:4,type:4,p:{x:135,y:243},t:[0,1.33,1.67,2,3],a:[0,0,0.5,0.7,0],sx:[0.2,0.2,0.2,0.2,0.5],sy:[0.7,0.7,0.7,1,1]},
            {pic:5,type:4,p:{x:222,y:270},t:[0,0.87,1.53,2.53,3],a:[0,0,0.5,0,0],sx:[0.5,1,1.5,0,0],sy:[0.5,1,1.5,0,0]},
            {pic:5,type:5,p:{x:99,y:289},t:[0,0.67,1.67,3],a:[0,0.5,0,0],sx:[1,1.5,2,0],sy:[1,1.5,2,0]},
        ],
        //  xuan:[
        //      {pic:1,type:1,p:{x:23,y:167},t:[0,0.5,1],a:[0,1,0]},
        //      {pic:2,type:2,p:{x:23,y:167},t:[0,0.5,1,1.5],a:[0,0,1,0]},
        //      {pic:3,type:2,p:{x:23,y:167},t:[0,1,1.5,2],a:[0,0,1,0]},
        //      {pic:4,type:2,p:{x:23,y:167},t:[0,1.5,2,2.5],a:[0,0,1,0]},
        //      {pic:5,type:2,p:{x:23,y:167},t:[0,0.5,2,2.5],a:[1,0,0,1]},
        //  ],

        deng:[
            {type:1,
                t1:[0,2.93*2,6.67*2,11.47*2,16.27*2,21.33*2,26.67*2],
                x:[-38,145.6,317.5,424.6,487.85,503,-38],
                y:[398-80,369-80,299-80,212.5-80,98-80,-19-80,-19-80],
                t2:[0,3.33*2,10.67*2,26.67*2],
                s:[0.4/2,1.2/2,0.3/2,0.3/2]},
            {type:2,
                t1:[0,5.27*2,8.47*2,11.67*2,18.6*2,26.67*2],
                x:[-24,-24,98.4,235.2,326.8,360],
                y:[455-80,455-80,374.1-80,254-80,114.5-80,-32-80],
                t2:[0,5.27*2,8.47*2,15.93*2,26.67*2],
                s:[0.6/2,0.6/2,1/2,0.5/2,0.5/2]},
            {type:3,
                t1:[0,1.6*2,3.66*2,8*2,16*2,26.67*2],
                x:[-45,23,111,360,541,710],
                y:[163-80,186.5-80,216.5-80,375.6/2-80,223/2-80,-178/2-80],
                t2:[0,1.6*2,3.66*2,8*2,16*2,26.67*2],
                s:[0.6/2,0.6/2,1/2,0.7/2,0.7/2,0.7/2]},
            {type:4,
                t1:[0,1.6*2,4*2,8*2,16.6*2,26.67*2],
                x:[-42/2,98/2,302.4/2,641.5/2,972.3/2,1384/2],
                y:[682/2-80,655/2-80,614.7/2-80,487.7/2-80,324/2-80,62/2-80],
                t2:[0,1.6*2,4*2,8*2,16.6*2,26.67*2],
                s:[0.4/2,0.4/2,1.2/2,0.7/2,0.7/2,0.7/2]},
        ]
    };

    private showNightEffect():void
    {   
        //挂灯
        for (let i = 0 ; i<this.nightcfg.glow.length; i++)
        {
            let cfg = this.nightcfg.glow[i];
            let glow = BaseBitmap.create("scene_eff_glow");
            glow.setPosition(cfg.p.x,cfg.p.y);
            glow.anchorOffsetX = glow.width/2;
            glow.anchorOffsetY = glow.height/2;
            this.addChild(glow);
            this._personTab.push(glow);

            if (cfg.type == 1 || cfg.type == 4)
            {   
                glow.setScale(cfg.s[0]);
                glow.alpha = cfg.a[0];
                egret.Tween.get(glow,{loop:true}).
                // to({alpha:cfg.a[0],scaleX:cfg.s[0],scaleY:cfg.s[0]},cfg.t[0]*1000).
                to({alpha:cfg.a[1],scaleX:cfg.s[1],scaleY:cfg.s[1]},cfg.t[1]*1000).
                to({alpha:cfg.a[2],scaleX:cfg.s[2],scaleY:cfg.s[2]},cfg.t[2]*1000);
            }
            else
            {   
                glow.setScale(cfg.s[0]);
                glow.alpha = cfg.a[0];
                egret.Tween.get(glow,{loop:true}).
                // to({alpha:cfg.a[0],scaleX:cfg.s[0],scaleY:cfg.s[0]},cfg.t[0]*1000).
                to({alpha:cfg.a[1],scaleX:cfg.s[1],scaleY:cfg.s[1]},cfg.t[1]*1000).
                to({alpha:cfg.a[2],scaleX:cfg.s[2],scaleY:cfg.s[2]},cfg.t[2]*1000).
                to({alpha:cfg.a[3],scaleX:cfg.s[3],scaleY:cfg.s[3]},cfg.t[3]*1000);
            }
           
        }

        //光
        for (let i = 0 ; i<this.nightcfg.light.length; i++)
        {
            let cfg = this.nightcfg.light[i];
            let glow = BaseBitmap.create("scene_eff_light"+cfg.pic);
            glow.setPosition(cfg.p.x,cfg.p.y);
            glow.anchorOffsetX = glow.width/2;
            glow.anchorOffsetY = glow.height/2;
            glow.blendMode = egret.BlendMode.ADD;
            this.addChild(glow);
            this._personTab.push(glow);

            glow.alpha = cfg.a[0];
            if (cfg.sx)
            {
                glow.scaleX = cfg.sx[0];
                glow.scaleY = cfg.sy[0];
            }
            if (cfg.type == 1)
            {
                egret.Tween.get(glow,{loop:true}).
                to({alpha:cfg.a[1]},(cfg.t[1]-cfg.t[0])*1000).
                to({alpha:cfg.a[2]},(cfg.t[2]-cfg.t[1])*1000).
                to({alpha:cfg.a[3]},(cfg.t[3]-cfg.t[2])*1000);
            }
            else if (cfg.type == 2)
            {
                egret.Tween.get(glow,{loop:true}).
                to({alpha:cfg.a[1]},(cfg.t[1]-cfg.t[0])*1000).
                to({alpha:cfg.a[2]},(cfg.t[2]-cfg.t[1])*1000);
            }
            else if (cfg.type == 3)
            {
                egret.Tween.get(glow,{loop:true}).
                to({alpha:cfg.a[1],scaleX:cfg.sx[1],scaleY:cfg.sy[1]},(cfg.t[1]-cfg.t[0])*1000).
                to({alpha:cfg.a[2],scaleX:cfg.sx[2],scaleY:cfg.sy[2]},(cfg.t[2]-cfg.t[1])*1000).
                to({alpha:cfg.a[3],scaleX:cfg.sx[3],scaleY:cfg.sy[3]},(cfg.t[3]-cfg.t[2])*1000).
                to({alpha:cfg.a[4],scaleX:cfg.sx[4],scaleY:cfg.sy[4]},(cfg.t[4]-cfg.t[3])*1000).
                to({alpha:cfg.a[5],scaleX:cfg.sx[5],scaleY:cfg.sy[5]},(cfg.t[5]-cfg.t[4])*1000);
            }
            else if (cfg.type == 4)
            {
                egret.Tween.get(glow,{loop:true}).
                to({alpha:cfg.a[1],scaleX:cfg.sx[1],scaleY:cfg.sy[1]},(cfg.t[1]-cfg.t[0])*1000).
                to({alpha:cfg.a[2],scaleX:cfg.sx[2],scaleY:cfg.sy[2]},(cfg.t[2]-cfg.t[1])*1000).
                to({alpha:cfg.a[3],scaleX:cfg.sx[3],scaleY:cfg.sy[3]},(cfg.t[3]-cfg.t[2])*1000).
                to({alpha:cfg.a[4],scaleX:cfg.sx[4],scaleY:cfg.sy[4]},(cfg.t[4]-cfg.t[3])*1000);
            }
            else if (cfg.type == 5)
            {
                egret.Tween.get(glow,{loop:true}).
                to({alpha:cfg.a[1],scaleX:cfg.sx[1],scaleY:cfg.sy[1]},(cfg.t[1]-cfg.t[0])*1000).
                to({alpha:cfg.a[2],scaleX:cfg.sx[2],scaleY:cfg.sy[2]},(cfg.t[2]-cfg.t[1])*1000).
                to({alpha:cfg.a[3],scaleX:cfg.sx[3],scaleY:cfg.sy[3]},(cfg.t[3]-cfg.t[2])*1000);
            }
        }


        let myClip = ComponentManager.getCustomMovieClip("scene_eff_guang",7);
		myClip.frameRate = 167;
		this.addChild(myClip);
        myClip.playWithTime(0);
        this._personTab.push(myClip);
        //炫光
        // for (let i = 0 ; i<this.nightcfg.xuan.length; i++)
        // {
        //     let cfg = this.nightcfg.xuan[i];
        //     let glow = BaseBitmap.create("scene_eff_xuan"+cfg.pic);
        //     glow.setPosition(cfg.p.x,cfg.p.y);
        //     glow.anchorOffsetX = glow.width/2;
        //     glow.anchorOffsetY = glow.height/2;
        //     glow.blendMode = egret.BlendMode.ADD;
        //     glow.rotation = -41;
        //     this.addChild(glow);
        //     glow.alpha = cfg.a[0];

        //     if (cfg.type == 1)
        //     {
        //         egret.Tween.get(glow,{loop:true}).
        //         to({alpha:cfg.a[1]},(cfg.t[1]-cfg.t[0])*1000).
        //         to({alpha:cfg.a[2]},(cfg.t[2]-cfg.t[1])*1000);
        //     }
        //     else
        //     {
        //         egret.Tween.get(glow,{loop:true}).
        //         to({alpha:cfg.a[1]},(cfg.t[1]-cfg.t[0])*1000).
        //         to({alpha:cfg.a[2]},(cfg.t[2]-cfg.t[1])*1000).
        //         to({alpha:cfg.a[3]},(cfg.t[3]-cfg.t[2])*1000);
        //     }
        // }

        //飞灯
        for (let i = 0 ; i<this.nightcfg.deng.length; i++)
        {
            let cfg = this.nightcfg.deng[i];

            let node:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
            node.name = "deng"+(i+1);
            this.addChild(node);
            let deng = BaseBitmap.create("scene_eff_deng");
            deng.setPosition(deng.width/2-15,deng.height/2-15);
            deng.anchorOffsetX = deng.width/2;
            deng.anchorOffsetY = deng.height/2;
            node.addChild(deng);

            let dengxu = BaseBitmap.create("scene_eff_dengxu");
            dengxu.anchorOffsetX = dengxu.width/2;
            dengxu.anchorOffsetY = dengxu.height/2;
            node.addChild(dengxu);
            dengxu.setPosition(20,20);
            dengxu.blendMode = egret.BlendMode.ADD;

            let denglong = BaseBitmap.create("scene_eff_denglong");
            denglong.anchorOffsetX = denglong.width/2;
            denglong.anchorOffsetY = denglong.height/2;
            node.addChild(denglong);
            denglong.setPosition(20,0);

            this._personTab.push(node);
            this._personTab.push(dengxu);
            this._personTab.push(denglong);

            node.anchorOffsetX = node.width/2;
            node.anchorOffsetY = node.height/2;

            node.rotation = 35;

            let rt1:number[] = [-3,4,-8,4,-8,-3];
            let t1:number[] = [0,0.2*2,0.53*2,0.87*2,1.2*2,1.33*2];
            let rt2:number[] = [2.5,-2.5,2.5,-2.5,2.5];
            let t2:number[] = [0,0.33*2,0.67*2,1*2,1.33*2];

            let isFirst = true;
            dengxu.rotation = rt1[0];

            //  egret.Tween.get(dengxu,{loop:true}).
            //     to({rotation:rt1[1]-rt1[0]},(t1[1]-t1[0])*1000).
            //     to({rotation:rt1[2]-rt1[1]},(t1[2]-t1[1])*1000).
            //     to({rotation:rt1[3]-rt1[2]},(t1[3]-t1[2])*1000).
            //     to({rotation:rt1[4]-rt1[3]},(t1[4]-t1[3])*1000).
            //     to({rotation:rt1[5]-rt1[4]},(t1[5]-t1[4])*1000);
              egret.Tween.get(dengxu,{loop:true}).
                to({rotation:6},800).
                to({rotation:-6},800);

                deng.rotation = 5;
            
                egret.Tween.get(deng,{loop:true}).
                to({rotation:rt2[1]-rt2[0]},(t2[1]-t2[0])*1000).
                to({rotation:rt2[2]-rt2[1]},(t2[2]-t2[1])*1000).
                to({rotation:rt2[3]-rt2[2]},(t2[3]-t2[2])*1000).
                to({rotation:rt2[4]-rt2[3]},(t2[4]-t2[3])*1000);

                denglong.alpha = 0;
                egret.Tween.get(denglong,{loop:true}).to({alpha:1},670).to({alpha:0},660);

            let anim = function()
            {
                egret.Tween.removeTweens(node);
                // egret.Tween.removeTweens(dengxu);
                // egret.Tween.removeTweens(deng);
                // egret.Tween.removeTweens(denglong);

                node.setScale(cfg.s[0]);
                if (cfg.type == 1)
                {   
                    node.setPosition(cfg.x[0],cfg.y[0]);
                    egret.Tween.get(node).
                    to({x:cfg.x[1], y:cfg.y[1]},(cfg.t1[1]-cfg.t1[0])*1000).
                    to({x:cfg.x[2], y:cfg.y[2]},(cfg.t1[2]-cfg.t1[1])*1000).
                    to({x:cfg.x[3], y:cfg.y[3]},(cfg.t1[3]-cfg.t1[2])*1000).
                    to({x:cfg.x[4], y:cfg.y[4]},(cfg.t1[4]-cfg.t1[3])*1000).
                    to({x:cfg.x[5], y:cfg.y[5]},(cfg.t1[5]-cfg.t1[4])*1000).
                    to({x:cfg.x[6], y:cfg.y[6]},(cfg.t1[6]-cfg.t1[5])*1000).call(anim);

                    egret.Tween.get(node).
                    to({scaleX:cfg.s[1],scaleY:cfg.s[1]},(cfg.t1[1]-cfg.t1[0])*1000).
                    to({scaleX:cfg.s[2],scaleY:cfg.s[2]},(cfg.t1[2]-cfg.t1[1])*1000).
                    to({scaleX:cfg.s[3],scaleY:cfg.s[3]},(cfg.t1[3]-cfg.t1[2])*1000);
                }
                else if (cfg.type == 2)
                {   
                    node.setPosition(cfg.x[0],cfg.y[0]);
                    egret.Tween.get(node).
                    to({x:cfg.x[1], y:cfg.y[1]},(cfg.t1[1]-cfg.t1[0])*1000).
                    to({x:cfg.x[2], y:cfg.y[2]},(cfg.t1[2]-cfg.t1[1])*1000).
                    to({x:cfg.x[3], y:cfg.y[3]},(cfg.t1[3]-cfg.t1[2])*1000).
                    to({x:cfg.x[4], y:cfg.y[4]},(cfg.t1[4]-cfg.t1[3])*1000).
                    to({x:cfg.x[5], y:cfg.y[5]},(cfg.t1[5]-cfg.t1[4])*1000).call(anim);;

                    egret.Tween.get(node).
                    to({scaleX:cfg.s[1],scaleY:cfg.s[1]},(cfg.t1[1]-cfg.t1[0])*1000).
                    to({scaleX:cfg.s[2],scaleY:cfg.s[2]},(cfg.t1[2]-cfg.t1[1])*1000).
                    to({scaleX:cfg.s[3],scaleY:cfg.s[3]},(cfg.t1[3]-cfg.t1[2])*1000).
                    to({scaleX:cfg.s[4],scaleY:cfg.s[4]},(cfg.t1[4]-cfg.t1[3])*1000);
                }
                else if (cfg.type == 3)
                {   
                    if (!isFirst)
                    {
                        node.setPosition(cfg.x[0],cfg.y[0]);
                        egret.Tween.get(node).
                        to({x:cfg.x[1], y:cfg.y[1]},(cfg.t1[1]-cfg.t1[0])*1000).
                        to({x:cfg.x[2], y:cfg.y[2]},(cfg.t1[2]-cfg.t1[1])*1000).
                        to({x:cfg.x[3], y:cfg.y[3]},(cfg.t1[3]-cfg.t1[2])*1000).
                        to({x:cfg.x[4], y:cfg.y[4]},(cfg.t1[4]-cfg.t1[3])*1000).
                        to({x:cfg.x[5], y:cfg.y[5]},(cfg.t1[5]-cfg.t1[4])*1000).call(anim);;

                        egret.Tween.get(node).
                        to({scaleX:cfg.s[1],scaleY:cfg.s[1]},(cfg.t1[1]-cfg.t1[0])*1000).
                        to({scaleX:cfg.s[2],scaleY:cfg.s[2]},(cfg.t1[2]-cfg.t1[1])*1000).
                        to({scaleX:cfg.s[3],scaleY:cfg.s[3]},(cfg.t1[3]-cfg.t1[2])*1000).
                        to({scaleX:cfg.s[4],scaleY:cfg.s[4]},(cfg.t1[4]-cfg.t1[3])*1000).
                        to({scaleX:cfg.s[5],scaleY:cfg.s[5]},(cfg.t1[5]-cfg.t1[4])*1000);
                    }
                    else
                    {
                        node.setPosition(cfg.x[4],cfg.y[4]);
                        egret.Tween.get(node).
                        // to({x:cfg.x[4], y:cfg.y[4]},(cfg.t1[4]-cfg.t1[3])*1000).
                        to({x:cfg.x[5], y:cfg.y[5]},(cfg.t1[5]-cfg.t1[4])*1000).call(anim);;

                        egret.Tween.get(node).
                        // to({scaleX:cfg.s[4],scaleY:cfg.s[4]},(cfg.t1[4]-cfg.t1[3])*1000).
                        to({scaleX:cfg.s[5],scaleY:cfg.s[5]},(cfg.t1[5]-cfg.t1[4])*1000);
                    }
                }
                else
                {
                    if (!isFirst)
                    {
                        node.setPosition(cfg.x[0],cfg.y[0]);
                        egret.Tween.get(node).
                        to({x:cfg.x[1], y:cfg.y[1]},(cfg.t1[1]-cfg.t1[0])*1000).
                        to({x:cfg.x[2], y:cfg.y[2]},(cfg.t1[2]-cfg.t1[1])*1000).
                        to({x:cfg.x[3], y:cfg.y[3]},(cfg.t1[3]-cfg.t1[2])*1000).
                        to({x:cfg.x[4], y:cfg.y[4]},(cfg.t1[4]-cfg.t1[3])*1000).
                        to({x:cfg.x[5], y:cfg.y[5]},(cfg.t1[5]-cfg.t1[4])*1000).call(anim);;

                        egret.Tween.get(node).
                        to({scaleX:cfg.s[1],scaleY:cfg.s[1]},(cfg.t1[1]-cfg.t1[0])*1000).
                        to({scaleX:cfg.s[2],scaleY:cfg.s[2]},(cfg.t1[2]-cfg.t1[1])*1000).
                        to({scaleX:cfg.s[3],scaleY:cfg.s[3]},(cfg.t1[3]-cfg.t1[2])*1000).
                        to({scaleX:cfg.s[4],scaleY:cfg.s[4]},(cfg.t1[4]-cfg.t1[3])*1000).
                        to({scaleX:cfg.s[5],scaleY:cfg.s[5]},(cfg.t1[5]-cfg.t1[4])*1000);
                    }
                    else
                    {
                        node.setPosition(cfg.x[3],cfg.y[3]);
                        egret.Tween.get(node).
                        to({x:cfg.x[4], y:cfg.y[4]},(cfg.t1[4]-cfg.t1[3])*1000).
                        to({x:cfg.x[5], y:cfg.y[5]},(cfg.t1[5]-cfg.t1[4])*1000).call(anim);;

                        egret.Tween.get(node).
                        // to({scaleX:cfg.s[3],scaleY:cfg.s[3]},(cfg.t1[3]-cfg.t1[2])*1000).
                        to({scaleX:cfg.s[4],scaleY:cfg.s[4]},(cfg.t1[4]-cfg.t1[3])*1000).
                        to({scaleX:cfg.s[5],scaleY:cfg.s[5]},(cfg.t1[5]-cfg.t1[4])*1000);
                    }
                }

                isFirst = false
            }

            anim();
            
           
        }
    }

    public dispose():void
	{
        this.hideSceneEffect();

        this._sceneId = null;
        if (this._bone)
        {
            this._bone.dispose();
        }
        this._bone = null;

        super.dispose();
    }

}