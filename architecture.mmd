architecture-beta
  group cloudflare[cloudflare]
  group prod[production] in cloudflare
  group private_prod[private] in prod
  group dbg[debug] in cloudflare
  group private_dbg[private] in dbg
  group trusted[trusted]
  group home[home] in trusted
  group windows[windows] in home
  group wsl[wsl] in windows
  group ubunts[ubunts] in home
  group client[client]

  service laptop(internet)[laptop] in trusted
  service client_laptop(internet)[laptop] in client
  service AI(internet)[AI] in client
  service ops(disk)[ops] in wsl
  service code(disk)[code] in wsl
  service electron(disk)[electron] in windows
  service gpu_engine(disk)[python] in ubunts

  service pages_prod(cloud)[front] in prod
  service bff_prod(cloud)[BFF] in prod
  service gateway_prod(cloud)[Gateway] in private_prod
  service adapter_prod(cloud)[Adapter] in private_prod
  service cf_engine_prod(cloud)[CF Services] in private_prod

  service pages_dbg(cloud)[front] in dbg
  service bff_dbg(cloud)[BFF] in dbg
  service gateway_dbg(cloud)[Gateway] in private_dbg
  service adapter_dbg(cloud)[Adapter] in private_dbg
  service cf_engine_dbg(cloud)[CF Services] in private_dbg

  service github(internet)[GitHub]
  service service_provider(internet)[service_provider]

  github:B -- T:ops
  ops:R -- L:code
  laptop:B -- T:electron
  laptop:R -- L:ops
  electron:B -- T:gpu_engine

  client_laptop:B -- T:pages_prod
  AI:B -- T:bff_prod
  pages_prod:B -- T:bff_prod
  bff_prod:B -- T:gateway_prod
  gateway_prod:B -- T:adapter_prod
  adapter_prod:R -- L:cf_engine_prod
  adapter_prod:B -- T:service_provider

  laptop:R -- L:pages_dbg
  pages_dbg:B -- T:bff_dbg
  bff_dbg:B -- T:gateway_dbg
  gateway_dbg:B -- T:adapter_dbg
  adapter_dbg:R -- L:cf_engine_dbg
  adapter_dbg:B -- T:service_provider
