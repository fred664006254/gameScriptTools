/**
 * 暴击虎牢关
 * @author 赵占涛
 */
class AcHuLaoView extends AcCommonView{
    // 血条
    private bloodBar:ProgressBar;
    // 血量百分比
    private bloodTxt:BaseTextField;
    // 剩余攻击次数
    private atkCountTxt:BaseTextField;
    // 倒计时
    private countdownTxt:BaseTextField;
    // // 跑马灯数据
    // private lampInfo:Array<any>;
    // 攻击按钮
    private atkButton:BaseButton;
    // 吕布容器
    private lvbuNode : BaseDisplayObjectContainer;
    // 吕布骨骼
    private boneNode : BaseLoadDragonBones;
    // 吕布非骨骼静态图
    private lvbuImg : BaseLoadBitmap;

    // 吕布的缩放值
    private readonly lvbuScale = 1;
    // 吕布的x
    private lvbuX = 0;
    // 吕布的y
    private lvbuY = 0;
    // 已击败图片
    private lvbuDie : BaseBitmap|BaseDisplayObjectContainer;
    // 受击特效
    private beAttackClip:CustomMovieClip;
    // 兑换
    private exchangeButton:BaseButton;




    private guanyu:BaseBitmap;
    private readonly guanyuScale = 0.4;
    private guanyuX = 0;
    private guanyuY = 0;

    private zhangfei:BaseBitmap;
    private zhangfeiScale = 0.4;
    private zhangfeiX = 0;
    private zhangfeiY = 0;

    private wanjia:BaseDisplayObjectContainer;
    private readonly wanjiaScale = 0.8;
    private wanjiaX = 0;
    private wanjiaY = 0;

    private arms: BaseBitmap;
    private isPlayAnim = false;
    private _bigBg: BaseLoadBitmap;
    //敌人图片
    private enemyNode: BaseLoadBitmap;

    public constructor()
    {
        super();
    }
    public static AID:string = null;
    public static CODE:string = null;

    private get cfg() : Config.AcCfg.HuLaoCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcHuLaoVo{
        return <AcHuLaoVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${AcHuLaoView.AID}-${AcHuLaoView.CODE}`;
    }

    protected initBg():void
	{   
        let bigBg = null;
        if(this.code == "2"){
            //雄王节
            if(!this.vo.isBossDie()){
                bigBg = BaseLoadBitmap.create("achulaoview_bg1-2");
            } else {
                bigBg = BaseLoadBitmap.create("achulaoview_bg2-2");
            }
            bigBg.height=1136;
        } else {
            bigBg = BaseLoadBitmap.create("tigertrappass_bg");
            bigBg.height=GameConfig.stageHeigth;
        }

        bigBg.width=GameConfig.stageWidth;
        
        bigBg.touchEnabled = true;
        this._bigBg = bigBg;
        this.addChild(bigBg);

	} 

    public initView(){
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAOATTACKTHEBOSS),this.getRewardHandler,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAONUMREWARD),this.getNumRewardHandler,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.backFromServantSkin,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshData,this);
        

        AcHuLaoView.AID = this.aid;
		AcHuLaoView.CODE = this.code;
        this.width = GameConfig.stageWidth;

        if(this.code == "1"){
            this.lvbuNode = new BaseDisplayObjectContainer();
            this.lvbuNode.x = GameConfig.stageWidth/2 + 20;
            this.lvbuNode.setScale(this.lvbuScale);
            this.addChild(this.lvbuNode);

            // 吕布
            if (App.CommonUtil.check_dragon()) {
                this.boneNode=App.DragonBonesUtil.getLoadDragonBones(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).bone);
                this.boneNode.y = 300;
                this.lvbuNode.addChild(this.boneNode);
                this.boneNode.setScale(0.9);
            } else {
                this.lvbuImg=BaseLoadBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).body);
                this.lvbuImg.x = -300;
                this.lvbuImg.y = -200;
                this.lvbuImg.setScale(0.8);
                this.lvbuNode.addChild(this.lvbuImg);
            }
            let maskShape = BaseBitmap.create("tigertrappass_lvbumask");
            maskShape.scaleY = 1.3;
            maskShape.x = -this.lvbuNode.x;
            maskShape.y = 100;
            this.lvbuNode.addChild(maskShape);

            this.lvbuDie = BaseBitmap.create("tigertrappass_lvbu_die");
            this.lvbuDie.x = -this.lvbuDie.width/2;
            this.lvbuDie.y = -this.lvbuDie.height/2;
            this.lvbuDie.visible = false;
            this.lvbuNode.addChild(this.lvbuDie);

            let bigBg2 = BaseLoadBitmap.create("tigertrappass_bg2");
            bigBg2.width=640;
            bigBg2.height=388;
            bigBg2.y = GameConfig.stageHeigth  - bigBg2.height;
            this.addChild(bigBg2);

            //活动规则背景图片
            let acruleTxtBg: BaseBitmap = BaseBitmap.create("tigertrappass_topbg");
            acruleTxtBg.y = 67;
            this.addChild(acruleTxtBg);
            //活动规则文本
            let acruleTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acHuLaoRuleInView", [String(this.cfg.cost)]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
            acruleTxt.textAlign = egret.HorizontalAlign.CENTER;
            acruleTxt.x = acruleTxtBg.x + acruleTxtBg.width/2 - acruleTxt.width/2;
            acruleTxt.y = acruleTxtBg.y + acruleTxtBg.height/2 - acruleTxt.height/2 - 5;
            this.addChild(acruleTxt);

        
            // 血条
    
            this.bloodBar = ComponentManager.getProgressBar("progress_blood","progress_bloodbg", 500);
            

            this.bloodBar.x = GameConfig.stageWidth/2 - this.bloodBar.width/2;
            this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height - 5 + 40;
            this.addChild(this.bloodBar);
            for(var i = 0; i < 9; i++) {
                let bloodSplite: BaseBitmap = BaseBitmap.create("tigertrappass_blood_splite");
                bloodSplite.x = 24/2 + (i+1) * (this.bloodBar.width-24)/10;
                this.bloodBar.addChild(bloodSplite);
            }
            this.bloodTxt = ComponentManager.getTextField("100%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            this.bloodTxt.x = this.bloodBar.width/2 - this.bloodTxt.width/2 + 5;
            this.bloodTxt.y = this.bloodBar.height/2 - this.bloodTxt.height/2 - 4;
            this.bloodBar.addChild(this.bloodTxt);

            // 宝箱
            for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
                let tmprcfg = this.cfg.lotteryNum[i];


                let rStatus = 1 ;
                if (this.vo.flags[i+1]) {
                    rStatus = 3; // 已领取
                } else if (this.vo.attacksum >= tmprcfg.needNum) {
                    rStatus = 2;
                }
                let imgres = "dailytask_box1_";
                if (i >2){
                    imgres = "dailytask_box2_";
                }
                let boxImg = BaseBitmap.create(imgres + String(rStatus));
                boxImg.setScale(0.8);
                boxImg.anchorOffsetX = 60/2;
                boxImg.anchorOffsetY = 64/2;
                boxImg.name = "boxImg"+i;
                boxImg.x = this.bloodBar.x + this.bloodBar.width*(1-tmprcfg.needNum/this.cfg.attackNum);
                boxImg.y = this.bloodBar.y;
                
                let lightImg =  BaseBitmap.create("dailytask_box_light");
                lightImg.anchorOffsetX = 80/2;
                lightImg.anchorOffsetY = 80/2;
                lightImg.x = boxImg.x + 5;
                lightImg.name = "lightImg"+i;
                lightImg.y = boxImg.y;
                lightImg.visible = false;
                this.addChild(lightImg);
                
                this.addChild(boxImg);
                boxImg.addTouchTap(this.boxClick,this,[i]);


                // // let arrowImg = BaseBitmap.create("dailytask_dt_03");
                // // arrowImg.x = perX - arrowImg.width/2;
                // // arrowImg.y = this._progress.y + this._progress.height/2 - arrowImg.height/2;
                // // this._nodeContainer.addChild(arrowImg);

                // let livenuseeBg =  BaseBitmap.create("dailytask_dt_03");
                
                // livenuseeBg.x = perX - livenuseeBg.width/2;
                // livenuseeBg.y = this._progress.y + this._progress.height/2 - livenuseeBg.height/2;
                // this._nodeContainer.addChild(livenuseeBg);

                // let numTxt =  ComponentManager.getTextField(tmprcfg.needLiveness ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
                // numTxt.x = perX - numTxt.width/2;
                // numTxt.y = livenuseeBg.y + livenuseeBg.height/2 - numTxt.height/2;
                // this._nodeContainer.addChild(numTxt);
            }

            // 查看吕布
            let skinLookBtn:BaseButton = ComponentManager.getButton("tigertrappass_lookbg","",this.skinLookClick,this);
            skinLookBtn.x = GameConfig.stageWidth/2 - skinLookBtn.width/2;
            this.addChild(skinLookBtn);
            let skinLookTxt:BaseBitmap=BaseBitmap.create("tigertrappass_look");
            skinLookTxt.x = 55 - skinLookTxt.width/2;
            skinLookTxt.y = skinLookBtn.height/2 - skinLookTxt.height/2;
            skinLookBtn.addChild(skinLookTxt);
            let skinTxt : BaseTextField = ComponentManager.getTextField(Config.ServantCfg.getServantItemById(Math.floor(Number(this.cfg.skinExchange)/10)).name + " " + Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).getSkinName() ,TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            skinTxt.x = skinLookBtn.width/2 + 30 - skinTxt.width/2;
            skinTxt.y = skinLookBtn.height/2 - skinTxt.height/2;
            skinLookBtn.addChild(skinTxt);

            // 大火苗
            let upgradeClip1 = ComponentManager.getCustomMovieClip("tigertrappass_smoke",10,1000/15);
            upgradeClip1.y = GameConfig.stageHeigth - 230;
            this.addChild(upgradeClip1);
            upgradeClip1.playWithTime();
            let upgradeClip2 = ComponentManager.getCustomMovieClip("tigertrappass_smoke",10,1000/15);
            upgradeClip2.scaleX = -1;
            upgradeClip2.x = GameConfig.stageWidth;
            upgradeClip2.y = GameConfig.stageHeigth - 230;
            this.addChild(upgradeClip2);
            upgradeClip2.playWithTime();
            // 关张二人
            let deltaS = 640/460;
            let guanyu = BaseLoadBitmap.create("servant_full_2014");
            guanyu.width = 431*deltaS;
            guanyu.height = 482;
            guanyu.scaleX = this.guanyuScale;
            guanyu.scaleY = this.guanyuScale;
            guanyu.x = 90; 
            guanyu.y = GameConfig.stageHeigth - 292; 
            this.guanyuX = guanyu.x;
            this.guanyuY = guanyu.y;
            this.addChild(guanyu);
            this.guanyu = guanyu;
            let zhangfei = BaseLoadBitmap.create("servant_full_2015");
            zhangfei.width = 431*deltaS;
            zhangfei.height = 482;
            zhangfei.scaleX = -this.zhangfeiScale;
            zhangfei.scaleY = this.zhangfeiScale;
            zhangfei.x = GameConfig.stageWidth - 90; 
            zhangfei.y = GameConfig.stageHeigth - 292; 
            this.zhangfeiX = zhangfei.x;
            this.zhangfeiY = zhangfei.y;
            this.addChild(zhangfei);
            this.zhangfei = zhangfei;
            // 玩家形象
            let userContainer = Api.playerVoApi.getMyPortrait();
            userContainer.scaleX = this.wanjiaScale;
            userContainer.scaleY = this.wanjiaScale;
            if(userContainer.width > 700){
                userContainer.x = this.width/2  - 130 ;
            }else{
                userContainer.x = this.width/2 - userContainer.width/2 *userContainer.scaleX ;
            }
            // userContainer.x = GameConfig.stageWidth/2 - userContainer.width * userContainer.scaleX /2;
            userContainer.y = GameConfig.stageHeigth - 310;
            this.wanjiaX = userContainer.x;
            this.wanjiaY = userContainer.y;
            this.addChild(userContainer);
            this.wanjia = userContainer;
            userContainer.mask = new egret.Rectangle(0,0,GameConfig.stageWidth,300);;

            this.lvbuNode.y = this.bloodBar.y + (userContainer.y - this.bloodBar.y)/2;
            this.lvbuX = this.lvbuNode.x;
            this.lvbuY = this.lvbuNode.y;
            skinLookBtn.y = this.lvbuNode.y + 122;
            // 小火星
            let starBoneNode=App.DragonBonesUtil.getLoadDragonBones("actigertrappass");
            starBoneNode.x = GameConfig.stageWidth/2
            starBoneNode.y = GameConfig.stageHeigth;
            this.addChild(starBoneNode);

            // 底部背景
            let buttomBg:BaseBitmap=BaseBitmap.create("public_bottombg1");
            buttomBg.height=145;
            buttomBg.y = GameConfig.stageHeigth-buttomBg.height;
            this.addChild(buttomBg);

            // 兑换
            let rewardLookBtn:BaseButton = ComponentManager.getButton("punish_reward_icon","",this.rewardLookClick,this);
            rewardLookBtn.x = 20;
            rewardLookBtn.y = buttomBg.y+buttomBg.height/2 - rewardLookBtn.height/2 + 10;
            this.addChild(rewardLookBtn);
            let rewardLookTxt:BaseBitmap=BaseBitmap.create("hulao_get");
            rewardLookTxt.x = rewardLookBtn.x + rewardLookBtn.width/2 - rewardLookTxt.width/2;
            rewardLookTxt.y = rewardLookBtn.y + 50 ;
            this.addChild(rewardLookTxt);
            this.exchangeButton = rewardLookBtn;
            // 礼包
            let giftBtn:BaseButton = ComponentManager.getButton("webpay_icon","",this.giftClick,this);
            giftBtn.x = 106;
            giftBtn.y = buttomBg.y+buttomBg.height/2 - giftBtn.height/2 + 10;
            this.addChild(giftBtn);
            let giftTxt:BaseBitmap=BaseBitmap.create("hulao_gift");
            giftTxt.x = giftBtn.x + giftBtn.width/2 - giftTxt.width/2;
            giftTxt.y = giftBtn.y + 50 ;
            this.addChild(giftTxt);
            // this.exchangeButton = giftBtn;

            // 攻击
            this.atkButton =  ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"atkrace_property1",this.atkClick,this);
            this.atkButton.x = buttomBg.x + buttomBg.width/2 - this.atkButton.width/2 * this.atkButton.scaleX ;
            this.atkButton.y = buttomBg.y + buttomBg.height/2 - this.atkButton.height/2 * this.atkButton.scaleY + 10;
            this.addChild(this.atkButton);

            //可攻击次数
            this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_atk_count", [String(this.vo.attacknum)]),TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            this.atkCountTxt.x = this.atkButton.x + this.atkButton.width/2 - this.atkCountTxt.width/2;
            this.atkCountTxt.y = this.atkButton.y - this.atkCountTxt.height - 3;
            this.addChild(this.atkCountTxt);
            //剩余时间
            this.countdownTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_countdown_time", [this.vo.acCountDown]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            this.countdownTxt.x = this.atkButton.x + this.atkButton.width/2 - this.countdownTxt.width/2;
            this.countdownTxt.y = this.atkButton.y + this.atkButton.height - 3;
            this.countdownTxt.visible = this.vo.isInActivity();
            this.addChild(this.countdownTxt);
            
            // 充值
            let rechargeBtn:BaseButton = ComponentManager.getButton("ac_luckbag-1_icon","",this.rechargeClick,this);
            rechargeBtn.x = GameConfig.stageWidth - 20 - rechargeBtn.width;
            rechargeBtn.y = buttomBg.y+buttomBg.height/2 - rechargeBtn.height/2 + 10;
            this.addChild(rechargeBtn);        
            let rechargeTxt = BaseBitmap.create("acsevenczhi");
            rechargeTxt.x = rechargeBtn.x + rechargeBtn.width/2 - rechargeTxt.width/2;
            rechargeTxt.y = rechargeBtn.y + 50;
            this.addChild(rechargeTxt); 

            // 受击特效
            this.beAttackClip = ComponentManager.getCustomMovieClip(this.getHitAnimInfo()[0],this.getHitAnimInfo()[1],70);
            this.beAttackClip.setEndCallBack(this.clipEndCallback,this);
            this.beAttackClip.visible = false;
            this.addChild(this.beAttackClip);

            // 开始攻击玩家
            this.attackWanjiaHandle();

            // 开始随机说话
            this.randomSay();
            this.refreshData();
        } else if(this.code == "2"){

            
            this.lvbuNode = new BaseDisplayObjectContainer();
            this.lvbuNode.width = 530;
            this.lvbuNode.height = 624;
            this.lvbuNode.x =  GameConfig.stageWidth / 2 - this.lvbuNode.width / 2;//GameConfig.stageWidth/2 + 20;
            this.lvbuNode.y =  GameConfig.stageHeigth / 2 - this.lvbuNode.height / 2 + 70 + 50;
            this.lvbuNode.setScale(this.lvbuScale);
            this.addChild(this.lvbuNode);

            this.lvbuX = this.lvbuNode.x;
            this.lvbuY = this.lvbuNode.y;
            // 吕布
            this.enemyNode = BaseLoadBitmap.create("achulaoview_enemy-2");
            this.enemyNode.width = 530;
            this.enemyNode.height = 624;
            this.enemyNode.x = 0
            this.enemyNode.y = 0;
            this.lvbuNode.addChild(this.enemyNode);
            let maskShape = BaseBitmap.create("tigertrappass_lvbumask");
            maskShape.scaleY = 1.3;
            maskShape.x = -this.lvbuNode.x;
            maskShape.y = 100;
            this.lvbuNode.addChild(maskShape);



            // this.lvbuDie = BaseBitmap.create("tigertrappass_lvbu_die");
            // this.lvbuDie.x = -this.lvbuDie.width/2;
            // this.lvbuDie.y = -this.lvbuDie.height/2;
            // this.lvbuDie.visible = false;
            // this.lvbuNode.addChild(this.lvbuDie);

            this.lvbuDie = new BaseDisplayObjectContainer();
            this.lvbuDie.width = 550;
            this.lvbuDie.height = 120;
            this.lvbuDie.x = GameConfig.stageWidth / 2 - this.lvbuDie.width/2;
            this.lvbuDie.y = GameConfig.stageHeigth / 2 - this.lvbuDie.height/2;
            this.addChild(this.lvbuDie);  

            let dieBg = BaseBitmap.create("public_lockbg");
            dieBg.width = 550;
            dieBg.height = 120;
            dieBg.x = 0;
            dieBg.y = 0;
            this.lvbuDie.addChild(dieBg);            

            let dieText = ComponentManager.getTextField(LanguageManager.getlocal("acHulaoWinText-2"),24,0xffdc39);
            dieText.lineSpacing = 5;
            dieText.width = 420;
            dieText.x = dieBg.x + dieBg.width/2 - dieText.width/2;
            dieText.y = dieBg.y + dieBg.height/2 - dieText.height/2;
            this.lvbuDie.addChild(dieText);

            


            //活动规则背景图片
            let acruleTxtBg: BaseBitmap = BaseBitmap.create("public_lockbg");
            acruleTxtBg.width = 640;
            acruleTxtBg.height = 120;
            acruleTxtBg.y = 69;
            this.addChild(acruleTxtBg);


            let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),this.cfg.titleID);
            playerHead.x = 30;
            playerHead.y = acruleTxtBg.y + acruleTxtBg.height/2 - playerHead.height/2;
            this.addChild(playerHead);


            //活动时间   
			let actimeText = ComponentManager.getTextField(LanguageManager.getlocal("acHuLaoAcTime",[this.vo.acTime]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			actimeText.x = acruleTxtBg.x + 150;
			actimeText.y = acruleTxtBg.y + 15;
			this.addChild(actimeText);

            //活动规则文本
            let acruleTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acHuLaoRuleInView-2", [String(this.cfg.cost)]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
            // acruleTxt.textAlign = egret.HorizontalAlign.CENTER;
            acruleTxt.width = 470;
            acruleTxt.lineSpacing
            acruleTxt.x = actimeText.x;
            acruleTxt.y = actimeText.y + actimeText.height +10;
            this.addChild(acruleTxt);

            // 血条
            this.bloodBar = ComponentManager.getProgressBar("progress_blood","progress_bloodbg", 500);
    

            this.bloodBar.x = GameConfig.stageWidth/2 - this.bloodBar.width/2;
            this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height + 10;
            this.addChild(this.bloodBar);
            for(var i = 0; i < 9; i++) {
                let bloodSplite: BaseBitmap = BaseBitmap.create("public_splite");
                bloodSplite.x = 12 + (i+1) * (this.bloodBar.width-24)/10;
                // bloodSplite.y = this.bloodBar.y;
                bloodSplite.name = "bloodSplite";
                this.bloodBar.addChild(bloodSplite);
            }
            this.bloodTxt = ComponentManager.getTextField("100%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            this.bloodTxt.x = this.bloodBar.width/2 - this.bloodTxt.width/2 + 5;
            this.bloodTxt.y = this.bloodBar.height/2 - this.bloodTxt.height/2 - 4;
            this.bloodBar.addChild(this.bloodTxt);


            let mark1 = BaseBitmap.create("achulaoview_progmark1-2");
            mark1.x = this.bloodBar.x - 20;
            mark1.y = this.bloodBar.y + this.bloodBar.height/2 - mark1.height/2;
            this.addChild(mark1);

            let mark2 = BaseBitmap.create("achulaoview_progmark2-2");
            mark2.x = this.bloodBar.x + this.bloodBar.width - mark2.width;
            mark2.y = this.bloodBar.y + this.bloodBar.height/2 - mark2.height/2 -5;
            this.addChild(mark2);

            // 宝箱
            for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
                let tmprcfg = this.cfg.lotteryNum[i];


                let rStatus = 1 ;
                if (this.vo.flags[i+1]) {
                    rStatus = 3; // 已领取
                } else if (this.vo.attacksum >= tmprcfg.needNum) {
                    rStatus = 2;
                }
                let imgres = "dailytask_box1_";
                if (i >2){
                    imgres = "dailytask_box2_";
                }
                let boxImg = BaseBitmap.create(imgres + String(rStatus));
                boxImg.setScale(0.8);
                boxImg.anchorOffsetX = 60/2;
                boxImg.anchorOffsetY = 64/2;
                boxImg.name = "boxImg"+i;
                boxImg.x = this.bloodBar.x + this.bloodBar.width*(1-tmprcfg.needNum/this.cfg.attackNum);
                boxImg.y = this.bloodBar.y + 50;
                
                let lightImg =  BaseBitmap.create("dailytask_box_light");
                lightImg.anchorOffsetX = 80/2;
                lightImg.anchorOffsetY = 80/2;
                lightImg.x = boxImg.x + 5;
                lightImg.name = "lightImg"+i;
                lightImg.y = boxImg.y;
                lightImg.visible = false;
                this.addChild(lightImg);
                
                this.addChild(boxImg);
                boxImg.addTouchTap(this.boxClick,this,[i]);


                // // let arrowImg = BaseBitmap.create("dailytask_dt_03");
                // // arrowImg.x = perX - arrowImg.width/2;
                // // arrowImg.y = this._progress.y + this._progress.height/2 - arrowImg.height/2;
                // // this._nodeContainer.addChild(arrowImg);

                // let livenuseeBg =  BaseBitmap.create("dailytask_dt_03");
                
                // livenuseeBg.x = perX - livenuseeBg.width/2;
                // livenuseeBg.y = this._progress.y + this._progress.height/2 - livenuseeBg.height/2;
                // this._nodeContainer.addChild(livenuseeBg);

                // let numTxt =  ComponentManager.getTextField(tmprcfg.needLiveness ,TextFieldConst.FONTSIZE_CONTENT_SMALL);
                // numTxt.x = perX - numTxt.width/2;
                // numTxt.y = livenuseeBg.y + livenuseeBg.height/2 - numTxt.height/2;
                // this._nodeContainer.addChild(numTxt);
            }

            

            // 底部背景
            let buttomBg:BaseBitmap=BaseBitmap.create("public_bottombg1");
            buttomBg.height=145;
            buttomBg.y = GameConfig.stageHeigth-buttomBg.height;
            this.addChild(buttomBg);



            // 攻击
            this.atkButton =  ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"atkrace_property1",this.atkClick,this);
            this.atkButton.x = buttomBg.x + buttomBg.width/2 - this.atkButton.width/2 * this.atkButton.scaleX ;
            this.atkButton.y = buttomBg.y + buttomBg.height/2 - this.atkButton.height/2 * this.atkButton.scaleY + 10;
            this.addChild(this.atkButton);

            //可攻击次数
            this.atkCountTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_atk_count", [String(this.vo.attacknum)]),TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            this.atkCountTxt.x = this.atkButton.x + this.atkButton.width/2 - this.atkCountTxt.width/2;
            this.atkCountTxt.y = this.atkButton.y - this.atkCountTxt.height - 3;
            this.addChild(this.atkCountTxt);
            //剩余时间
            this.countdownTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_countdown_time", [this.vo.acCountDown]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            this.countdownTxt.x = this.atkButton.x + this.atkButton.width/2 - this.countdownTxt.width/2;
            this.countdownTxt.y = this.atkButton.y + this.atkButton.height - 3;
            this.countdownTxt.visible = this.vo.isInActivity();
            this.addChild(this.countdownTxt);
            
            // 充值
            let rechargeBtn:BaseButton = ComponentManager.getButton("ac_luckbag-1_icon","",this.rechargeClick,this);
            rechargeBtn.x = GameConfig.stageWidth - 20 - rechargeBtn.width;
            rechargeBtn.y = buttomBg.y+buttomBg.height/2 - rechargeBtn.height/2 + 10;
            this.addChild(rechargeBtn);        
            let rechargeTxt = BaseBitmap.create("acsevenczhi");
            rechargeTxt.x = rechargeBtn.x + rechargeBtn.width/2 - rechargeTxt.width/2;
            rechargeTxt.y = rechargeBtn.y + 50;
            this.addChild(rechargeTxt); 

            // 受击特效
            this.beAttackClip = ComponentManager.getCustomMovieClip(this.getHitAnimInfo()[0],this.getHitAnimInfo()[1],70);
            this.beAttackClip.setEndCallBack(this.clipEndCallback,this);
            this.beAttackClip.visible = false;
            this.addChild(this.beAttackClip);

            this.beAttackClip.setEndCallBack(()=>{
                this.beAttackClip.visible = false;
            },this);


            this.arms = BaseBitmap.create("achulaoview_arms-2");
            this.arms.anchorOffsetX = 33;
            this.arms.anchorOffsetY = 150;
            this.arms.x = this.lvbuNode.x + this.lvbuNode.width/2 - 90;
            this.arms.y = this.lvbuNode.y + this.lvbuNode.height/2 ;
            this.arms.rotation = -60;
            this.arms.visible = false;
            this.addChild(this.arms);



            // // 开始攻击玩家
            // this.attackWanjiaHandle();

            // // 开始随机说话
            // this.randomSay();
            this.refreshData();
        }


    }
    private randomSay() {
        if (this.vo.attacksum < this.cfg.attackNum) {
            // 随机一个人说话
            let rndMan = Math.floor(Math.random() * 3);
            let rndSay = Math.floor(Math.random() * 3);
            let rndSayBg:BaseBitmap=BaseBitmap.create("public_9v_bg11");
            let rndSayTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acHuLao_"+["lvbu","guanyu","zhangfei"][rndMan]+"_say" + (rndSay + 1)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            rndSayBg.width=rndSayTxt.width + 30;
            rndSayBg.height=rndSayTxt.height + 60;
            if (rndMan === 0) {
                rndSayBg.x = 500 + rndSayBg.width/2
                rndSayBg.y = 300 - rndSayBg.height/2;
                rndSayBg.scaleX = -1;
            } else if (rndMan === 1) {
                rndSayBg.x = 140 - rndSayBg.width/2;
                rndSayBg.y = GameConfig.stageHeigth - 350 - rndSayBg.height/2;
            } else if (rndMan === 2) {
                rndSayBg.x = 540 + rndSayBg.width/2;
                rndSayBg.y = GameConfig.stageHeigth - 350 - rndSayBg.height/2;
                rndSayBg.scaleX = -1;
            }
            this.addChild(rndSayBg);
            rndSayTxt.x = rndSayBg.x + rndSayBg.scaleX * rndSayBg.width/2 - rndSayTxt.width/2;
            rndSayTxt.y = rndSayBg.y + 20;
            this.addChild(rndSayTxt);
            egret.Tween.get(rndSayBg)
                .wait(2000)
                .call(()=>{
                    rndSayBg.visible = false;
                    rndSayTxt.visible = false;
                })
                .wait(2000)            
                .call(()=>{
                    this.randomSay();
                    rndSayBg.parent.removeChild(rndSayBg);
                    rndSayTxt.parent.removeChild(rndSayTxt);
                });
        }
    }
    private tick()
    {
        this.countdownTxt.text = LanguageManager.getlocal("acTigertrappass_countdown_time", [this.vo.acCountDown]);
        this.countdownTxt.visible = this.vo.isInActivity();
    }
    // 刷新数据
	private refreshData()
	{
        let lvbuDieFlag = this.vo.attacksum >= this.cfg.attackNum;
        this.atkCountTxt.text = LanguageManager.getlocal("acTigertrappass_atk_count", [String(this.vo.attacknum)]);
        this.atkCountTxt.visible = this.vo.attacksum < this.cfg.attackNum;
        this.bloodBar.setPercentage(1 - (this.vo.attacksum / this.cfg.attackNum));
        this.bloodTxt.text = Math.floor((1 - (this.vo.attacksum / this.cfg.attackNum)) * 100) + "%";
        this.bloodTxt.x = this.bloodBar.width/2 - this.bloodTxt.width/2;

        if (lvbuDieFlag) {
            this.atkButton.setText("acTigertrappass_win")
        } else if (this.vo.attacknum >= 10) {
            this.atkButton.setText("acTigertrappass_atk_ten");
        } else {
            this.atkButton.setText("atkrace_property1");
        }

        if (this.vo.attacksum < this.cfg.attackNum) {
            App.DisplayUtil.changeToNormal(this.atkButton);
        } else {
            App.DisplayUtil.changeToGray(this.atkButton);
        }
        
        if(this.code == "1"){
            // 门客id
            let servantId = Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).servantId;
            let amuletNum = Api.amuletVoApi.getAmuletNum(servantId,String(this.cfg.skinActiveId));
            if (!Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.skinExchange)) && amuletNum >= this.cfg.skinActiveNum) {
                App.CommonUtil.addIconToBDOC(this.exchangeButton);
            }else{
                App.CommonUtil.removeIconFromBDOC(this.exchangeButton);
            }
            if (lvbuDieFlag) {
                App.DisplayUtil.changeToGray(this.boneNode?this.boneNode:this.lvbuImg);
            } else {
                App.DisplayUtil.changeToNormal(this.boneNode?this.boneNode:this.lvbuImg);
            }
        } else if(this.code == "2"){
            this.lvbuNode.visible = !lvbuDieFlag;

            if(lvbuDieFlag){
                this._bigBg.setRes("achulaoview_bg2-2");
            }

            //雄王节
            // if(!this.vo.isBossDie()){  _bigBg
            //     // bigBg = BaseLoadBitmap.create("achulaoview_bg1-2");
            // } else {
            //     // bigBg = BaseLoadBitmap.create("achulaoview_bg2-2");
            // }



        } 

        this.lvbuDie.visible = lvbuDieFlag;




        // 宝箱状态
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
			let tmprcfg = this.cfg.lotteryNum[i];
			// let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(tmpK);
			let boxImg = this.getChildByName("boxImg"+i);
			let lightImg =  this.getChildByName("lightImg"+ i);

			let rStatus = 1 ;
            if (this.vo.flags[i+1]) {
                rStatus = 3; // 已领取
            } else if (this.vo.attacksum >= tmprcfg.needNum) {
                rStatus = 2;
            }
			let imgres = "dailytask_box1_";
			if (i >2){
				imgres = "dailytask_box2_";
			}
			
			if (boxImg instanceof(BaseBitmap))
			{
				boxImg.texture = ResourceManager.getRes(imgres + rStatus);
			}
			
			if (rStatus == 2) //可领取状态需要添加背景光
			{	
				lightImg.visible = true;
				egret.Tween.get(lightImg,{loop:true}).to({rotation:lightImg.rotation+360},10000);
				egret.Tween.get(boxImg,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
			}else
			{
				lightImg.visible = false;
				egret.Tween.removeTweens(lightImg);
				egret.Tween.removeTweens(boxImg);
			}
		}
        
	}
    private backFromServantSkin() {
        if (App.CommonUtil.check_dragon()) {
            this.boneNode=App.DragonBonesUtil.getLoadDragonBones(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).bone);
            this.boneNode.y = 300;
            this.boneNode.setScale(0.9);
            this.lvbuNode.addChildAt(this.boneNode, 0);
            if (this.vo.attacksum >= this.cfg.attackNum) {
                App.DisplayUtil.changeToGray(this.boneNode);
            } else {
                App.DisplayUtil.changeToNormal(this.boneNode);
            }
        }
    }

    private skinLookClick() {
        if (App.CommonUtil.check_dragon()) {
            this.lvbuNode.removeChild(this.boneNode);
            this.boneNode.stop();
            this.boneNode.dispose();
        }
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTSKINCHANGEVIEW,{servantId:Math.floor(Number(this.cfg.skinExchange)/10), skinId:this.cfg.skinExchange,isDisplay:true});
    }
    private rewardLookClick() {
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACHULAOLISTPOPUPVIEW,{"aid":this.aid,"code":this.code});
    }
    private giftClick() {
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACHULAOGIFTLISTPOPUPVIEW,{"aid":this.aid,"code":this.code});
    }
    private boxClick(event, index) {
        
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if ((!this.vo.flags[index+1]) && this.vo.attacksum >= this.cfg.lotteryNum[index].needNum) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_HULAONUMREWARD, { "activeId": this.aid + "-" + this.code, "levelId": index + 1 });
        } else {
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{type : this.aid, activeCode: this.code, id : index});
        }
    }
    private atkClick() {
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.vo.attacksum >= this.cfg.attackNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acTigertrappass_win"));
            return;
        }
        if (this.vo.attacknum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acTigertrappass_attack_num_notenough"));
            return;
        }
        let attackCount = this.vo.attacknum >= 10?10:1;
        this.attackLvbuHandle(()=>{
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_HULAOATTACKTHEBOSS, { "activeId": this.aid + "-" + this.code, "attack": attackCount });
        });
    }
    private rechargeClick():void{
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

	private attackWanjiaHandle():void
	{
        if (this.vo.attacksum < this.cfg.attackNum) {
            let moveTime1:number = 60;
            let moveTime2:number = 260;
            let scaleTo:number = 0.75;
            let moveY = GameConfig.stageHeigth;
            let moveTo:egret.Point = egret.Point.create( this.lvbuNode.x + (1-scaleTo)*this.lvbuNode.width/2 ,moveY);
            egret.Tween.get(this.lvbuNode)
            .wait(7000)
            .to({x : this.lvbuNode.x, y : this.lvbuNode.y - 100},300)//后移		
            .to({x:moveTo.x,y:moveTo.y,scaleX:scaleTo,scaleY:scaleTo,},moveTime1)
            .call(()=>{
                this.beAttackHand(false);
            },this)
            .to({x:this.lvbuX,y:this.lvbuY,scaleX : this.lvbuScale, scaleY : this.lvbuScale},moveTime2)
            .call(()=>{
                this.attackWanjiaHandle();
            });
        }
	}
	private attackLvbuHandle(attackCb):void
	{
        if(this.code == "1"){
            // 还原吕布位置
            egret.Tween.removeTweens(this.lvbuNode);
            this.lvbuNode.setScale(this.lvbuScale);
            this.lvbuNode.x = this.lvbuX;
            this.lvbuNode.y = this.lvbuY;
            // 还原关羽位置
            egret.Tween.removeTweens(this.guanyu);
            this.guanyu.setScale(this.guanyuScale);
            this.guanyu.x = this.guanyuX;
            this.guanyu.y = this.guanyuY;
            // 还原张飞位置
            egret.Tween.removeTweens(this.zhangfei);
            this.zhangfei.scaleX = - this.zhangfeiScale;
            this.zhangfei.scaleY = this.zhangfeiScale;
            this.zhangfei.x = this.zhangfeiX;
            this.zhangfei.y = this.zhangfeiY;
            // 还原玩家位置
            egret.Tween.removeTweens(this.wanjia);
            this.wanjia.setScale(this.wanjiaScale);
            this.wanjia.x = this.wanjiaX;
            this.wanjia.y = this.wanjiaY;

            let moveTime1:number = 60;
            let moveTime2:number = 260;
            egret.Tween.get(this.wanjia)
                .to({x : this.wanjiaX, y : this.wanjiaY + 50},300)//后移		
                .to({x:this.wanjiaX,y:this.lvbuY,scaleX:this.wanjiaScale,scaleY:this.wanjiaScale},moveTime1)
                .call(()=>{
                    this.beAttackHand(true);
                },this)
                .to({x:this.wanjiaX,y:this.wanjiaY,scaleX : this.wanjiaScale, scaleY : this.wanjiaScale},moveTime2)
                .call(()=>{
                    if (
                        (this.vo.attacknum < 10 && this.vo.attacksum + 1 < this.cfg.attackNum) 
                        || 
                        (this.vo.attacknum >= 10 && this.vo.attacksum + 10 < this.cfg.attackNum)
                        )  {
                        this.attackWanjiaHandle(); // 如果仅能再打一次了，就不再让吕布攻击了
                    }
                    attackCb();
                });
            egret.Tween.get(this.guanyu)
                .to({x : this.guanyuX, y : this.guanyuY + 50},300)//后移		
                .to({x:this.guanyuX + 50,y:this.lvbuY,scaleX:this.guanyuScale,scaleY:this.guanyuScale},moveTime1)
                .to({x:this.guanyuX,y:this.guanyuY,scaleX : this.guanyuScale, scaleY : this.guanyuScale},moveTime2)
            egret.Tween.get(this.zhangfei)
                .to({x : this.zhangfeiX, y : this.zhangfeiY + 50},300)//后移		
                .to({x:this.zhangfeiX - 50,y:this.lvbuY,scaleX:-this.zhangfeiScale,scaleY:this.zhangfeiScale},moveTime1)
                .to({x:this.zhangfeiX,y:this.zhangfeiY,scaleX : -this.zhangfeiScale, scaleY : this.zhangfeiScale},moveTime2)
        } else if(this.code == "2"){
            if(this.isPlayAnim){
                return;
            }
            this.isPlayAnim = true;
            // this.arms.rotation = -90;
            egret.Tween.get(this.arms)
                .set({rotation:-60,visible:true,alpha:0})
                .to({alpha:1},50)
                .to({rotation:20},100)
                .call(()=>{
                    this.beAttackHand(true);
                    
                })
                .to({alpha:0},50)
                .set({visible:false})
                .wait(500)
                .call(()=>{
                    this.isPlayAnim = false;
                    attackCb();
                });


        }
 
        
	}

	protected getHitAnimInfo():any[]
	{
		return ["atk_anim_",8];
	}
    private beAttackHand(attackLvbu:boolean):void
    {
        if(this.code == "1"){
            this.beAttackClip.visible = true;
            if (attackLvbu) {
                this.beAttackClip.setPosition(GameConfig.stageWidth/2 - 420/2, this.lvbuY - 379/2);
            } else {
                this.beAttackClip.setPosition(GameConfig.stageWidth/2 - 420/2, this.wanjiaY + 100 - 379/2);
            }
            this.beAttackClip.goToAndPlay(0);
            this.beAttackClip.playWithTime(1);

            if (attackLvbu) {
                egret.Tween.get(this.lvbuNode)
                .to({x : this.lvbuX, y : this.lvbuY - 50},100)//后移		
                .to({x:this.lvbuX,y:this.lvbuY},120)
            } else {
                egret.Tween.get(this.guanyu)
                .to({x : this.guanyuX, y : this.guanyuY + 30},100)//后移		
                .to({x:this.guanyuX,y:this.guanyuY},120)
                egret.Tween.get(this.zhangfei)
                .to({x : this.zhangfeiX, y : this.zhangfeiY + 30},100)//后移		
                .to({x:this.zhangfeiX,y:this.zhangfeiY},120)
                egret.Tween.get(this.wanjia)
                .to({x : this.wanjiaX, y : this.wanjiaY + 30},100)//后移		
                .to({x:this.wanjiaX,y:this.wanjiaY},120)
            }
        } else if(this.code == "2"){
            this.beAttackClip.visible = true;
          
            this.beAttackClip.setPosition(GameConfig.stageWidth/2 - 420/2 + 35, this.lvbuY + 624/2 - 250);
       
            this.beAttackClip.goToAndPlay(0);
            this.beAttackClip.playWithTime(1);


            if (attackLvbu) {
                egret.Tween.get(this.lvbuNode)
                .to({x : this.lvbuX, y : this.lvbuY - 50},100)//后移		
                .to({x:this.lvbuX,y:this.lvbuY},120)
            } 
        }

    }
    // 受击动画播放完成回调
    private clipEndCallback() 
    {
        App.LogUtil.log("clipEndCallback");
    }

    // 获得奖励
	private getRewardHandler(event:egret.Event)
	{
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY_HULAOATTACKTHEBOSS) {
            if (event.data.data.ret === 0) {
                let data = event.data.data.data;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    "rewards":data.rewards,
                    "otherRewards":data.otherrewards,
                    "isPlayAni":true, 
                    showTip:data.critnum>0?LanguageManager.getlocal("acHuLaoBaoji"):null
                });
            } else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
	}
    // 获得宝箱奖励
	private getNumRewardHandler(event:egret.Event)
	{
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY_HULAONUMREWARD) {
            if (event.data.data.ret === 0) {
                let data = event.data.data.data;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards,"otherRewards":data.otherrewards,"isPlayAni":true});
            } else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
	}
	protected getSoundBgName():string
	{
		return "music_dailyboss";
	}
    protected getResourceList():string[]
	{


        let baseList = [
                "ac_luckbag-1_icon",
                "acsevenczhi",
                "dailytask_box1_1",
                "dailytask_box1_2",
                "dailytask_box1_3",
                "dailytask_box2_1",
                "dailytask_box2_2",
                "dailytask_box2_3",
                "dailytask_box_light",
                "progress_blood",
                "progress_bloodbg",
        ];
        let codeList = null;
        if(this.code == "1"){
            codeList = [
                "actigertrappassview",
                "tigertrappass_topbg",
                "punish_reward_icon",
                "skin_half_10331",
                "webpay_icon",
               

            ]
        } else if(this.code == "2"){
            codeList = [
                "achulaoview_arms-2",
                "achulaoview_armsicon-2",
                "achulaoview_enemy-2",
                "achulaoview_progmark1-2",
                "achulaoview_progmark2-2",
                "achulaoview_bg2-2"
              
            ]
        }

        return super.getResourceList().concat(baseList).concat(codeList);
	}
    
    public dispose():void
	{   
        this.bloodBar = null;
        this.bloodTxt = null;
        this.atkCountTxt = null;
        this.countdownTxt = null;
        // this.lampInfo = null;
        this.atkButton = null;
        this.lvbuNode  = null;
        this.boneNode  = null;
        this.lvbuImg  = null;
        this.lvbuX = 0;
        this.lvbuY = 0;
        this.lvbuDie = null;
        this.beAttackClip = null;
        this.exchangeButton = null;

        this.guanyu = null;
        this.guanyuX = 0;
        this.guanyuY = 0;

        this.zhangfei = null;
        this.zhangfeiScale = 0.4;
        this.zhangfeiX = 0;
        this.zhangfeiY = 0;

        this.wanjia = null;
        this.wanjiaX = 0;
        this.wanjiaY = 0;
        this.arms = null;
        this.isPlayAnim = false;
        //敌人图片
        this.enemyNode = null;
        this._bigBg = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAOATTACKTHEBOSS),this.getRewardHandler,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAONUMREWARD),this.getNumRewardHandler,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.backFromServantSkin,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshData,this);
        super.dispose();
    }
}