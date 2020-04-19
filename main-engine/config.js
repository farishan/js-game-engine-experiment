const _config = {
    // mode: 'testing',
    mode: 'development',
}

function isDev(){
    return _config.mode === 'development';
}

$engine.config = _config;
