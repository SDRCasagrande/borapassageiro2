import { useState, useEffect } from 'react';

const API_URL = 'https://api.bkaiser.com.br';

export function VideoGallery() {
    const [videos, setVideos] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/api/content/public`)
            .then(res => res.json())
            .then(data => {
                const gallery = data.filter((i: any) => i.section === 'gallery' && i.isActive);
                setVideos(gallery);
            })
            .catch(() => { });
    }, []);

    if (videos.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50" id="galeria">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bora na Prática</h2>
                    <p className="text-xl text-gray-600">Veja quem já está usando e aprovando!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                            {/* Video Container */}
                            <div className="relative aspect-video bg-black">
                                <iframe
                                    className="w-full h-full absolute inset-0"
                                    src={`https://www.youtube.com/embed/${video.url}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-900 truncate">{video.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
