import React, { ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends (React.Component as any) {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: any) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-xl border border-stone-200">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-8 border border-red-100">
              <AlertCircle className="w-10 h-10 text-[#a61b1b]" />
            </div>
            <h1 className="text-3xl font-serif mb-4 text-stone-900">意境受阻</h1>
            <p className="text-stone-500 font-serif mb-8 leading-relaxed text-sm">
              抱歉，画卷在展开时遇到了意料之外的阻碍。可能是由于存储空间不足或数据异常。
            </p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-3 px-8 py-3 bg-stone-900 text-white text-sm font-serif rounded-full hover:bg-[#a61b1b] transition-all mx-auto shadow-lg shadow-stone-200"
            >
              <RefreshCw className="w-4 h-4" />
              重构画卷
            </button>
            <p className="mt-8 text-[10px] text-stone-300 uppercase tracking-widest">
              {(this.state as any).error?.message || 'Unknown Error'}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
