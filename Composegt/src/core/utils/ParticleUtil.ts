namespace App
{
	export namespace ParticleUtil 
	{
		/**
		 * 获取粒子动画
		 * @param resName png文件名
		 * @param jsonName json文件名，可选，默认规则是，renName_json文件名，多个配置公用同一个png时候需要传json名
		 */
		export function getParticle(resName:string,jsonName?:string):particle.GravityParticleSystem
		{
			let texture:egret.Texture=ResourceManager.getRes(resName);
			let config:any=null;
			if(RES.hasRes(resName+"_json"))
			{
				config=ResourceManager.getRes(resName+"_json");
			}
			else
			{
				config=ResourceManager.getRes(jsonName);
			}
			let systemParticle:particle.GravityParticleSystem = new particle.GravityParticleSystem(texture,config);
			return systemParticle;
		}
	}
}