import { Nav } from '@fluentui/react';
export default function FluentNav()
{
    return (
        <div style={{ width: "330px" }}>
            <Nav
                selectedKey='file'
                groups={[
                    {
                        links: [
                            { key: 'file', url: '', name: 'file' },
                            { key: 'shell', url: '', name: 'shell' },
                        ]
                    }
                ]}
                onLinkClick={e => e?.preventDefault()}
            />
        </div>
    );
}
