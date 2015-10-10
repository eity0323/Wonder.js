/// <reference path="../../../definitions.d.ts"/>
module dy{
export class ShaderChunk{public static empty:GLSLChunk = {top:"", define:"", varDeclare:"", funcDeclare:"", funcDefine:"", body:""}
public static NULL:number = -1.0;
public static mirror_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_mirrorCoord;\n",funcDeclare: "",funcDefine: "//todo which way to mix mirror color and textureColor?\n		float blendOverlay(float base, float blend) {\n			return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );\n		}\n",body: "\n			vec4 color = texture2DProj(u_mirrorSampler, v_mirrorCoord);\n\n			color = vec4(blendOverlay(u_mirrorColor.r, color.r), blendOverlay(u_mirrorColor.g, color.g), blendOverlay(u_mirrorColor.b, color.b), 1.0);\n\n			gl_FragColor = color;\n			//gl_FragColor = vec4(v_mirrorCoord.x/v_mirrorCoord.w, v_mirrorCoord.y/v_mirrorCoord.w, 1.0, 1.0);\n\n",}
public static mirror_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_mirrorCoord;\n",funcDeclare: "",funcDefine: "",body: "\n//vec4 worldPosition = u_mMatrix * vec4( a_position, 1.0 );\ngl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);\n\n\nmat4 textureMatrix = mat4(\n                        0.5, 0.0, 0.0, 0.0,\n                        0.0, 0.5, 0.0, 0.0,\n                        0.0, 0.0, 0.5, 0.0,\n                        0.5, 0.5, 0.5, 1.0\n);\n\n			v_mirrorCoord = textureMatrix * gl_Position;\n\n",}
public static basic_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_color;\n",funcDeclare: "",funcDefine: "",body: "gl_FragColor = v_color;\n",}
public static basic_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_color;\n",funcDeclare: "",funcDefine: "",body: "v_color = vec4(a_color, 1.0);\n",}
public static basic_envMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_dir;\n",funcDeclare: "",funcDefine: "",body: "gl_FragColor = textureCube(u_samplerCube0, v_dir);\n",}
public static basic_envMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_dir;\n",funcDeclare: "",funcDefine: "",body: "v_dir = a_position;\n",}
public static envMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_normal;\nvarying vec3 v_position;\n",funcDeclare: "",funcDefine: "",body: "vec3 inDir = normalize(v_position - u_cameraPos);\n",}
public static envMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_normal;\nvarying vec3 v_position;\n",funcDeclare: "",funcDefine: "",body: "v_normal = vec3(u_normalMatrix * vec4(a_normal, 1.0));\n    v_position = vec3(u_mMatrix * vec4(a_position, 1.0));\n",}
public static fresnel_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){\n    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);\n    float fresnelPower = 5.0;\n    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);\n\n    return ratio / 100.0;\n}\n",body: "vec3 normal = normalize(v_normal);\n\n    vec3 reflectDir = reflect(inDir, normal);\n    vec3 refractDir = refract(inDir, normal, u_refractionRatio);\n\n    vec4 reflectColor = textureCube(u_samplerCube0, reflectDir);\n    vec4 refractColor = textureCube(u_samplerCube0, refractDir);\n\n	if(u_reflectivity != NULL){\n        gl_FragColor = mix(reflectColor, refractColor, u_reflectivity);\n	}\n	else{\n        gl_FragColor = mix(reflectColor, refractColor, computeFresnelRatio(inDir, normal, u_refractionRatio));\n	}\n\n",}
public static reflection_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_FragColor = textureCube(u_samplerCube0, reflect(inDir, normalize(v_normal)));\n",}
public static refraction_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_FragColor = textureCube(u_samplerCube0, refract(inDir, normalize(v_normal), u_refractionRatio));\n",}
public static common_define:GLSLChunk = {top: "",define: "#define NULL -1.0\n",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static common_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static common_function:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "mat2 transpose(mat2 m) {\n  return mat2(  m[0][0], m[1][0],   // new col 0\n                m[0][1], m[1][1]    // new col 1\n             );\n  }\nmat3 transpose(mat3 m) {\n  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n                m[0][1], m[1][1], m[2][1],  // new col 1\n                m[0][2], m[1][2], m[2][2]   // new col 1\n             );\n  }\n",body: "",}
public static common_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static highp_fragment:GLSLChunk = {top: "precision highp float;\nprecision highp int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static lowp_fragment:GLSLChunk = {top: "precision lowp float;\nprecision lowp int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static mediump_fragment:GLSLChunk = {top: "precision mediump float;\nprecision mediump int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "",}
public static buildCubemapShadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_worldPosition;\n",funcDeclare: "",funcDefine: "",body: "\n// get distance between fragment and light source\n    float lightDistance = length(v_worldPosition - u_lightPos);\n\n    // map to [0,1] range by dividing by farPlane\n    lightDistance = lightDistance / u_farPlane;\n\n\ngl_FragData[0] = packDepth(lightDistance);\n\n\n//gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);\n//gl_FragData[0] = vec4(lightDistance, 1.0, 1.0, 1.0);\n",}
public static buildCubemapShadowMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_worldPosition;\n",funcDeclare: "",funcDefine: "",body: "v_worldPosition = vec3(u_mMatrix * vec4(a_position, 1.0));\n    gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);\n",}
public static buildShadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "// Packing a float in GLSL with multiplication and mod\nvec4 packDepth(in float depth) {\n    const vec4 bit_shift = vec4(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0);\n    const vec4 bit_mask = vec4(0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0);\n    // combination of mod and multiplication and division works better\n    vec4 res = mod(depth * bit_shift * vec4(255), vec4(256) ) / vec4(255);\n    res -= res.xxyz * bit_mask;\n\n    return res;\n}\n",body: "",}
public static buildTwoDShadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_FragData[0] = packDepth(gl_FragCoord.z);\n",}
public static buildTwoDShadowMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_Position = u_vpMatrixFromLight * u_mMatrix * vec4(a_position, 1.0);\n//gl_Position = u_pMatrix* u_vMatrix * u_mMatrix * vec4(a_position, 1.0);\n",}
public static cubemapShadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "// PCF\nvec3 getShadowVisibilityByPCF(float currentDepth, vec3 fragToLight, float bias){\n    //only support in opengl es 3.0+\n    //vec3 sampleOffsetDirections[20] = vec3[]\n    //(\n       //vec3( 1,  1,  1), vec3( 1, -1,  1), vec3(-1, -1,  1), vec3(-1,  1,  1),\n       //vec3( 1,  1, -1), vec3( 1, -1, -1), vec3(-1, -1, -1), vec3(-1,  1, -1),\n       //vec3( 1,  1,  0), vec3( 1, -1,  0), vec3(-1, -1,  0), vec3(-1,  1,  0),\n       //vec3( 1,  0,  1), vec3(-1,  0,  1), vec3( 1,  0, -1), vec3(-1,  0, -1),\n       //vec3( 0,  1,  1), vec3( 0, -1,  1), vec3( 0, -1, -1), vec3( 0,  1, -1)\n    //);\n    vec3 sampleOffsetDirections[20];\n\n    sampleOffsetDirections[0] = vec3( 1,  1,  1);\n    sampleOffsetDirections[1] = vec3( 1,  -1,  1);\n    sampleOffsetDirections[2] = vec3( -1,  -1,  1);\n    sampleOffsetDirections[3] = vec3( -1,  1,  1);\n\n    sampleOffsetDirections[4] = vec3( 1,  1,  -1);\n    sampleOffsetDirections[5] = vec3( 1,  -1,  -1);\n    sampleOffsetDirections[6] = vec3( -1,  -1,  -1);\n    sampleOffsetDirections[7] = vec3( -1,  1,  -1);\n\n    sampleOffsetDirections[8] = vec3( 1,  1,  0);\n    sampleOffsetDirections[9] = vec3( 1,  -1,  0);\n    sampleOffsetDirections[10] = vec3( -1,  -1,  0);\n    sampleOffsetDirections[11] = vec3( -1,  1,  0);\n\n    sampleOffsetDirections[12] = vec3( 1,  0,  1);\n    sampleOffsetDirections[13] = vec3( -1,  0,  1);\n    sampleOffsetDirections[14] = vec3( 1,  0,  -1);\n    sampleOffsetDirections[15] = vec3( -1,  0,  -1);\n\n    sampleOffsetDirections[16] = vec3( 0,  1,  1);\n    sampleOffsetDirections[17] = vec3( 0,  -1,  1);\n    sampleOffsetDirections[18] = vec3( 0,  -1,  -1);\n    sampleOffsetDirections[19] = vec3( 0,  1,  -1);\n\n    float shadow = 0.0;\n    int samples = 20;\n\n    //float diskRadius = 0.05;\n    //Another interesting trick we can apply here is that we can change the diskRadius based on how far the viewer is away from a fragment; this way we can increase the offset radius by the distance to the viewer, making the shadows softer when far away and sharper when close by.\n    float viewDistance = length(u_cameraPos - v_worldPosition);\n    float diskRadius = (1.0 + (viewDistance / u_farPlane)) / 25.0;\n\n    //for(int i = 0; i < samples; ++i)\n    for(int i = 0; i < 20; ++i)\n    {\n        float pcfDepth = unpackDepth(textureCube(u_cubemapShadowMapSampler, fragToLight + sampleOffsetDirections[i] * diskRadius));\n        pcfDepth *= u_farPlane;   // Undo mapping [0;1]\n        shadow += currentDepth - bias > pcfDepth  ? u_shadowDarkness : 1.0;\n    }\n    shadow /= float(samples);\n\n    return vec3(shadow);\n}\n\n\nvec3 getShadowVisibility(vec3 lightDir) {\n// Get vector between fragment position and light position\n    vec3 fragToLight= v_worldPosition - u_lightPos;\n    // Use the light to fragment vector to sample from the depth map\n    float closestDepth = unpackDepth(textureCube(u_cubemapShadowMapSampler, fragToLight));\n    //float closestDepth = textureCube(u_cubemapShadowMapSampler, fragToLight).r;\n\n    // It is currently in linear range between [0,1]. Re-transform back to original value\n    closestDepth *= u_farPlane;\n    // Now get current linear depth as the length between the fragment and light position\n    float currentDepth = length(fragToLight);\n\n\n    #if defined(SHADOWMAP_TYPE_PCF_SOFT)\n    return getShadowVisibilityByPCF(currentDepth, fragToLight, getShadowBias(lightDir));\n    #else\n    return vec3(currentDepth > closestDepth + getShadowBias(lightDir) ? u_shadowDarkness : 1.0);\n    #endif\n}\n",body: "",}
public static diffuseMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_diffuseMapTexCoord;\n",funcDeclare: "",funcDefine: "vec3 getMaterialDiffuse() {\n        return vec3(texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord));\n    }\n",body: "",}
public static diffuseMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_diffuseMapTexCoord;\n",funcDeclare: "",funcDefine: "",body: "vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;\n    v_diffuseMapTexCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;\n    //v_diffuseMapTexCoord = a_texCoord;\n",}
public static light_common:GLSLChunk = {top: "",define: "",varDeclare: "#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 direction;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n\n",funcDeclare: "",funcDefine: "vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)\n{\n    vec3 materialDiffuse = getMaterialDiffuse();\n    vec3 materialSpecular = getMaterialSpecular();\n\n    float dotResultBetweenNormAndLight = dot(normal, lightDir);\n    float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n    float spec = 0.0;\n    //背面（指立方体中与当前面对应的背面，而不是当前面的反面）没有当前面反射光\n    if(dotResultBetweenNormAndLight < 0.0){\n        spec = 0.0;\n    }\n    else{\n        vec3 reflectDir = reflect(-lightDir, normal);\n        spec = pow(max(dot(viewDir, reflectDir), 0.0), u_shininess);\n    }\n\n    vec3 ambientColor = u_ambient * materialDiffuse;\n\n    vec3 diffuseColor = diff * color * materialDiffuse * intensity;\n\n    vec3 specularColor = spec * materialSpecular * intensity;\n\n    return  ambientColor + getShadowVisibility(lightDir) * attenuation * (diffuseColor + specularColor);\n}\n\n\n\n\n\n#if POINT_LIGHTS_COUNT > 0\nvec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)\n{\n    //lightDir is not normalize computing distance\n    float distance = length(lightDir);\n\n    float attenuation = 0.0;\n    if(distance < light.range)\n    {\n        attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));\n    }\n\n    lightDir = normalize(lightDir);\n\n    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir)\n{\n    float attenuation = 1.0;\n\n    lightDir = normalize(-lightDir);\n\n    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\nvoid calcTotalLight(inout vec3 totalLight, vec3 norm, vec3 viewDir){\n    #if POINT_LIGHTS_COUNT > 0\n       for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n            totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir);\n       }\n    #endif\n\n    #if DIRECTION_LIGHTS_COUNT > 0\n       for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n            totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir);\n       }\n    #endif\n}\n",body: "",}
public static light_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_worldPosition;\n",funcDeclare: "",funcDefine: "",body: "vec3 norm = normalize(getNormal());\n    vec3 viewDir = normalize(getViewDir());\n\n    vec3 totalLight = vec3(0, 0, 0);\n\n    calcTotalLight(totalLight, norm, viewDir);\n\n    gl_FragColor = vec4(totalLight, 1.0);\n",}
public static light_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_worldPosition;\n",funcDeclare: "",funcDefine: "",body: "v_worldPosition = vec3(u_mMatrix * vec4(a_position, 1.0));\n\n    gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);\n",}
public static noDiffuseMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getMaterialDiffuse() {\n        return u_diffuse;\n    }\n",body: "",}
public static noNormalMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_normal;\n",funcDeclare: "vec3 getNormal();\n\n",funcDefine: "#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return u_pointLights[x].position - v_worldPosition;\n        }\n    }\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return u_directionLights[x].direction;\n        }\n    }\n}\n#endif\n\n\nvec3 getViewDir(){\n    return normalize(u_cameraPos - v_worldPosition);\n}\nvec3 getNormal(){\n    return v_normal;\n}\n\n",body: "",}
public static noNormalMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_normal;\n",funcDeclare: "",funcDefine: "",body: "v_normal = vec3(u_normalMatrix * vec4(a_normal, 1.0));\n",}
public static noShadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getShadowVisibility(vec3 lightDir) {\n        return vec3(1.0);\n    }\n",body: "",}
public static noSpecularMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getMaterialSpecular() {\n        return u_specular;\n    }\n",body: "",}
public static normalMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_normalMapTexCoord;\nvarying vec3 v_viewDir;\n#if POINT_LIGHTS_COUNT > 0\nvarying vec3 v_pointLightDir[POINT_LIGHTS_COUNT];\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvarying vec3 v_directionLightDir[DIRECTION_LIGHTS_COUNT];\n#endif\n\n",funcDeclare: "vec3 getNormal();\n\n",funcDefine: "#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return v_pointLightDir[x];\n        }\n    }\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\n\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return v_directionLightDir[x];\n        }\n    }\n}\n#endif\n\n\nvec3 getViewDir(){\n    return v_viewDir;\n}\nvec3 getNormal(){\n        // Obtain normal from normal map in range [0,1]\n        vec3 normal = texture2D(u_normalMapSampler, v_normalMapTexCoord).rgb;\n\n        // Transform normal vector to range [-1,1]\n        return normalize(normal * 2.0 - 1.0);  // this normal is in tangent space\n}\n",body: "",}
public static normalMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_normalMapTexCoord;\n	varying vec3 v_viewDir;\n\n\n#if POINT_LIGHTS_COUNT > 0\nvarying vec3 v_pointLightDir[POINT_LIGHTS_COUNT];\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvarying vec3 v_directionLightDir[DIRECTION_LIGHTS_COUNT];\n#endif\n\n",funcDeclare: "",funcDefine: "mat3 computeTBN(){\n            //vec3 T = normalize(normalMatrix * tangent);\n            //vec3 B = normalize(normalMatrix * bitangent);\n            //vec3 N = normalize(normalMatrix * normal);\n\n            vec3 T = normalize(vec3(u_normalMatrix * vec4(a_tangent, 1.0)));\n            vec3 N = normalize(vec3(u_normalMatrix * vec4(a_normal, 1.0)));\n            // re-orthogonalize T with respect to N\n            T = normalize(T - dot(T, N) * N);\n            // then retrieve perpendicular vector B with the cross product of T and N\n            vec3 B = cross(T, N);\n\n\n            return transpose(mat3(T, B, N));\n        }\n",body: "mat3 TBN = computeTBN();\n\n    //v_tangentLightPos = TBN * light.position;\n    //v_tangentCameraPos  = TBN * u_cameraPos;\n    //v_tangentPos  = TBN * v_position;\n\n\n    vec3 tangentPosition = TBN * vec3(u_mMatrix * vec4(a_position, 1.0));\n\n    v_normalMapTexCoord = a_texCoord;\n\n    v_viewDir = normalize(TBN * u_cameraPos - tangentPosition);\n\n\n#if POINT_LIGHTS_COUNT > 0\n       for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n            //not normalize for computing distance\n            v_pointLightDir[i] = TBN * u_pointLights[i].position - tangentPosition;\n       }\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\n       for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n            v_directionLightDir[i] = normalize(- TBN * u_directionLights[i].direction);\n       }\n#endif\n\n",}
public static shadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "float getShadowBias(vec3 lightDir){\n    if(u_shadowBias != NULL){\n        return u_shadowBias;\n    }\n    /*!\n     //todo need verify\n\n     A shadow bias of 0.005 solves the issues of our scene by a large extent, but some surfaces that have a steep angle to the light source might still produce shadow acne. A more solid approach would be to change the amount of bias based on the surface angle towards the light: something we can solve with the dot product:\n\n     return max(0.005 * (1.0 - dot(normalize(getNormal()), lightDir)), 0.001);\n     */\n\n    return 0.001;\n}\n\nfloat unpackDepth(vec4 rgbaDepth) {\n    const vec4 bitShift = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);\n    return dot(rgbaDepth, bitShift);\n}\n\n",body: "",}
public static specularMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_specularMapTexCoord;\n",funcDeclare: "",funcDefine: "vec3 getMaterialSpecular() {\n        return vec3(texture2D(u_specularMapSampler, v_specularMapTexCoord));\n    }\n",body: "",}
public static specularMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_specularMapTexCoord;\n",funcDeclare: "",funcDefine: "",body: "v_specularMapTexCoord = a_texCoord;\n",}
public static twoDShadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_positionFromLight;\n",funcDeclare: "",funcDefine: "// PCF\nvec3 getShadowVisibilityByPCF(float currentDepth, vec2 shadowCoord, float bias){\n\n    float shadow = 0.0;\n    vec2 texelSize = vec2(1.0 / u_shadowMapSize[0], 1.0 / u_shadowMapSize[1]);\n\n    for(int x = -1; x <= 1; ++x)\n    {\n        for(int y = -1; y <= 1; ++y)\n        {\n            float pcfDepth = unpackDepth(texture2D(u_twoDShadowMapSampler, shadowCoord + vec2(x, y) * texelSize));\n            shadow += currentDepth - bias > pcfDepth  ? u_shadowDarkness : 1.0;\n        }\n    }\n    shadow /= 9.0;\n\n    return vec3(shadow);\n}\n\n\n\nvec3 getShadowVisibility(vec3 lightDir) {\n    //project texture\n    vec3 shadowCoord = (v_positionFromLight.xyz / v_positionFromLight.w) / 2.0 + 0.5;\n\n    #if defined(SHADOWMAP_TYPE_PCF_SOFT)\n    // Percentage-close filtering\n    // (9 pixel kernel)\n    return getShadowVisibilityByPCF(shadowCoord.z, shadowCoord.xy, getShadowBias(lightDir));\n\n    #else\n    return vec3(shadowCoord.z > unpackDepth(texture2D(u_twoDShadowMapSampler, shadowCoord.xy)) + getShadowBias(lightDir) ? u_shadowDarkness : 1.0);\n\n    #endif\n}\n",body: "",}
public static twoDShadowMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec4 v_positionFromLight;\n",funcDeclare: "",funcDefine: "",body: "v_positionFromLight = u_vpMatrixFromLight * u_mMatrix * vec4(a_position, 1.0);\n",}
public static map_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_texCoord;\n",funcDeclare: "",funcDefine: "",body: "gl_FragColor = texture2D(u_sampler2D0, v_texCoord);\n",}
public static map_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_texCoord;\n",funcDeclare: "",funcDefine: "",body: "vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;\n    v_texCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;\n",}
public static multi_map_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "vec4 color0 = texture2D(u_sampler2D0, v_texCoord);\n    vec4 color1 = texture2D(u_sampler2D1, v_texCoord);\n    if(u_combineMode == 0){\n        gl_FragColor = mix(color0, color1, u_mixRatio);\n    }\n    else if(u_combineMode == 1){\n        gl_FragColor = color0 * color1;\n    }\n    else if(u_combineMode == 2){\n        gl_FragColor = color0 + color1;\n    }\n",}
public static skybox_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_dir;\n",funcDeclare: "",funcDefine: "",body: "gl_FragColor = textureCube(u_samplerCube0, v_dir);\n",}
public static skybox_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_dir;\n",funcDeclare: "",funcDefine: "",body: "vec4 pos = u_pMatrix * mat4(mat3(u_vMatrix)) * u_mMatrix * vec4(a_position, 1.0);\n\n    gl_Position = pos.xyww;\n\n    v_dir = a_position;\n",}
}
export type GLSLChunk = {top?:string;define?:string;varDeclare?:string;funcDeclare?:string;funcDefine?:string;body?:string;}
}