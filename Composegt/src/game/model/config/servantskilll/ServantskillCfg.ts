namespace Config
{
	export namespace ServantskillCfg 
	{
		let servantSkillListCfg:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:ServantskillItemCfg;
				if(!servantSkillListCfg.hasOwnProperty(String(key)))
				{
					servantSkillListCfg[String(key)]=new ServantskillItemCfg();
				}
				itemCfg=servantSkillListCfg[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id=String(key);
			}
		}

		export function hasSpecialSkill(seravntId:string):boolean{
			let cfg = Config.ServantCfg.getServantItemById(seravntId);
			return typeof cfg.skillActive!= `undefined`;
		}
		

		export function getSpecialSkill(seravntId:string):string[]{
			let arr = [];
			if(this.hasSpecialSkill(seravntId)){
				let id = 1;
				while(servantSkillListCfg[`${seravntId}${id}`]){
					arr.push(`${seravntId}${id}`);
					++ id;
				}
			}
			return arr;
		}

		export function getSpecialSkillItemCfg(skillId:string):ServantskillItemCfg{
			return servantSkillListCfg[skillId];
		}

		/**
		 * 获取技能名
		 */
		export function getSkillNameById(skillId: string): string {
			return LanguageManager.getlocal("servant_skillname" + skillId)
		}

		/**获取技能ICON */
		export function getSkillIconKeyById(skillId: string): string {
			let res = "servant_skill_icon" + skillId;
			if(!RES.hasRes(res)){
				res = 'servant_skill_icon1';
			}
			return res;
		}
	}


	class ServantskillItemCfg extends BaseItemCfg
	{
		/**
		 * 门客皮肤技能
		 */
		public id:string;
		/**
		 * 光环["triggerType"]=2,
                ["percent"]=50,
                ["effectType"]=1,
                ["value"]=0.4,
                ["turn"]=1,
                ["maxNum"]=1,
                ----triggerType     触发类型
				----1     开场触发
				----2     攻击触发
				----3     击败触发
				----effectType     加成类型
				----1     增加攻击力
				----2     增加暴击率
				----3     增加暴击伤害
				----4     增加分裂攻击状态
				----5     击杀加攻击
				----105     单体伤害(对应目标)
				----106     群体伤害(所有目标)
				----107     随机目标伤害
				----addType     加成目标类型
				----1     自己
				----2     敌人
				----3     随机己方
				----4     随机敌方
				----atkNum     随机目标数
				----atkscale     攻击比例
				----addNum     添加数量
				----value     加成效果
				----turn     持续回合
				----maxNum     最大叠加次数
				----criRemove      暴击移除标记
				----inherit     继承
				----descType     技能描述cn读取字段
				------     使用数组形式配置需要cn读取的字段
				------     cn使用对应占位符{1}{2}……有几个配置介个
		 */
		public effect:{triggerType:number,effectType:number,descType:string[],percent:number,value:number,turn:number,maxNum:number,addType:number,atkNum:number,atkscale:number,addNum:number,criRemove:number,inherit:number}[];

		public getDescStr():string{
			let str = '';
			//触发方式
			let param = [];
			// for(let i = 0; i < this.effect.length; ++ i){
			// 	// let unit = this.effect[i];
			// 	// if(unit.descType){
			// 	// 	unit.descType.forEach((key)=>{
			// 	// 		if(key == 'percemt'){
			// 	// 			param.push(unit.percent+'');
			// 	// 		}
			// 	// 		if(key == 'value'){
			// 	// 			param.push(unit.value < 1 ? (unit.value*100).toFixed(0) : unit.value.toString());
			// 	// 		}
			// 	// 		if(key == 'inherit'){
			// 	// 			param.push(unit.percent+'');
			// 	// 		}
			// 	// 		if(key == 'percemt'){
			// 	// 			param.push(unit.percent+'');
			// 	// 		}
			// 	// 		if(key == 'percemt'){
			// 	// 			param.push(unit.percent+'');
			// 	// 		}
			// 	// 	})
			// 	// 	percent,value,inherit
			// 	// }

			// 	// str = str.substring(0,str.length-1) + `\n`
			// }
				// if(unit.triggerType){
				// 	str += `${LanguageManager.getlocal(`servantSkillDesc_Special_triggerType${unit.triggerType}`, [unit.percent+''])}，`;
				// }
				// if(unit.effectType){
				// 	let arr = [];

				// 	if(unit.addType){
				// 		let str =  LanguageManager.getlocal(`servantSkillDesc_Special_addType${unit.addType}`, [unit.addNum+''])
				// 		arr.push(str)
				// 	}

				// 	if(unit.atkNum){
				// 		arr.push(unit.atkNum+``);
				// 	}

				// 	let value = '';
				// 	if(unit.atkscale){
				// 		value = unit.atkscale < 1 ? (unit.atkscale*100).toFixed(0) : unit.atkscale.toString();
				// 	}
				// 	else if(unit.value){
				// 		value = unit.value < 1 ? (unit.value*100).toFixed(0) : unit.value.toString();
				// 	}
				// 	arr.push(value);
				// 	str += `${LanguageManager.getlocal(`servantSkillDesc_Special_effectType${unit.effectType}`, arr)}，`
				// }
				// if(unit.maxNum){
				// 	str += `${LanguageManager.getlocal(`servantSkillDesc_Special_maxNum${unit.maxNum == 1 ? 1 : 2}`, [unit.maxNum+''])}，`
				// }
				// if(unit.turn){
				// 	str += `${LanguageManager.getlocal(`servantSkillDesc_Special_turn`, [unit.turn+''])}，`;
				// }
			switch(Number(this.id)){
				case 10331:
					param.push((this.effect[0].value*100).toFixed(0));
					param.push((this.effect[1].atkscale*100).toFixed(0));
					param.push(this.effect[0].turn)
					break;
				case 10351:
				case 20091:
				case 20101:
					param.push(this.effect[0].percent);
					param.push((this.effect[0].value*100).toFixed(0));
					param.push(this.effect[0].turn)
					break;
				case 10361:
					param.push((this.effect[0].value*100).toFixed(0));
					param.push(this.effect[0].turn);
					break;
				case 10371:
					param.push((this.effect[0].atkscale*100).toFixed(0));
					break;
				case 10381:
				case 20111:
				case 20121:
				case 20131:
					param.push((this.effect[0].value*100).toFixed(0));
					param.push(this.effect[0].turn);
					break;
				case 20141:
					param.push((this.effect[0].value*100).toFixed(0));
					param.push((this.effect[1].value*100).toFixed(0));
					param.push(this.effect[1].maxNum);
					break;
				case 20151:
					param.push(this.effect[0].percent);
					param.push((this.effect[0].atkscale*100).toFixed(0));
					break;
				case 20161:
					param.push(this.effect[0].percent);
					param.push((this.effect[0].value*100).toFixed(0));
					param.push(this.effect[0].maxNum);
					break;
				case 20171:
					param.push((this.effect[0].value*100).toFixed(0));
					break;
				case 20181:
					param.push(this.effect[0].percent);
					param.push(this.effect[0].atkscale);
					break;
			}
			return LanguageManager.getlocal(`servant_skilldescribe`+this.id, param);
		}

		// public getDescStr():string{
		// 	let str = LanguageManager.getlocal(`servant_skilldescribe`+this.id);
		// 	return str;
		// }
	}

}