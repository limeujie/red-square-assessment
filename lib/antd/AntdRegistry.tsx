'use client';

import React from 'react';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import type Entity from '@ant-design/cssinjs/es/Cache';

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
    const cache = React.useMemo<Entity>(() => createCache(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [createCache]);

    useServerInsertedHTML(() => (
        <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
    ));

    return <StyleProvider hashPriority='high' cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;