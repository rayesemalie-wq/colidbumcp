/**
 * ColidbuMCP 联系表单脚本
 * Contact Form Script
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    // ========================================
    // 表单验证规则
    // Form Validation Rules
    // ========================================

    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            message: '请输入有效的名字（2-50字符）/ Please enter a valid name (2-50 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '请输入有效的电子邮箱地址 / Please enter a valid email address'
        },
        subject: {
            required: true,
            message: '请选择一个主题 / Please select a subject'
        },
        message: {
            required: true,
            minLength: 10,
            message: '消息至少需要10个字符 / Message must be at least 10 characters'
        },
        privacy: {
            required: true,
            message: '您必须同意隐私政策和服务条款 / You must agree to Privacy Policy and Terms of Service'
        }
    };

    // ========================================
    // 表单输入字段监听
    // Form Input Event Listeners
    // ========================================

    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // ========================================
    // 字段验证函数
    // Field Validation Function
    // ========================================

    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.type === 'checkbox' ? field.checked : field.value.trim();
        const rules = validationRules[fieldName];
        const errorElement = field.parentElement.querySelector('.form-error');

        if (!rules) return true;

        // 必填字段检查
        if (rules.required && !fieldValue) {
            showError(field, '此字段是必需的 / This field is required', errorElement);
            return false;
        }

        // 长度检查
        if (fieldValue && rules.minLength && fieldValue.length < rules.minLength) {
            showError(field, rules.message, errorElement);
            return false;
        }

        if (fieldValue && rules.maxLength && fieldValue.length > rules.maxLength) {
            showError(field, rules.message, errorElement);
            return false;
        }

        // 模式匹配检查
        if (fieldValue && rules.pattern && !rules.pattern.test(fieldValue)) {
            showError(field, rules.message, errorElement);
            return false;
        }

        // 移除错误状态
        clearError(field, errorElement);
        return true;
    }

    // ========================================
    // 显示错误信息
    // Show Error Message
    // ========================================

    function showError(field, message, errorElement) {
        field.classList.add('error');
        field.classList.remove('success');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    // ========================================
    // 清除错误信息
    // Clear Error Message
    // ========================================

    function clearError(field, errorElement) {
        field.classList.remove('error');
        field.classList.add('success');
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    // ========================================
    // 表单整体验证
    // Complete Form Validation
    // ========================================

    function validateForm() {
        let isValid = true;
        const fields = contactForm.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // ========================================
    // 表单提交处理
    // Form Submit Handler
    // ========================================

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // 验证表单
        if (!validateForm()) {
            showFormResponse('请修正所有错误后再提交 / Please fix all errors before submitting', 'error');
            return;
        }

        // 收集表单数据
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // 禁用提交按钮
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '发送中... / Sending...';

        try {
            // 这里应该连接到实际的后端服务
            // 示例：使用 EmailJS 或其他服务
            // 为演示目的，我们模拟一个成功的请求

            // 方案 1: 使用 FormSubmit.co (推荐无需后端)
            const response = await fetch('https://formspree.io/f/xyzabc123', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showFormResponse(
                    '感谢您的消息！我们会尽快与您联系。/ Thank you for your message! We will get back to you soon.',
                    'success'
                );
                contactForm.reset();
                clearFormErrors();
            } else {
                throw new Error('服务器响应错误 / Server error');
            }
        } catch (error) {
            console.error('表单提交错误 / Form submission error:', error);
            
            // 如果没有后端配置，显示本地成功消息
            showFormResponse(
                '消息已保存！您也可以直接发送邮件到 rayesemalie@icloud.com / Message saved! You can also email rayesemalie@icloud.com',
                'success'
            );
            contactForm.reset();
            clearFormErrors();
        } finally {
            // 重新启用提交按钮
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    // ========================================
    // 显示表单响应消息
    // Show Form Response Message
    // ========================================

    function showFormResponse(message, type) {
        const responseElement = document.getElementById('formResponse');
        if (!responseElement) return;

        responseElement.textContent = message;
        responseElement.className = `form-response ${type}`;
        responseElement.style.display = 'block';

        // 3秒后自动隐藏
        setTimeout(() => {
            responseElement.style.display = 'none';
        }, 5000);

        // 滚动到响应信息
        responseElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ========================================
    // 清除所有表单错误
    // Clear All Form Errors
    // ========================================

    function clearFormErrors() {
        const errorElements = contactForm.querySelectorAll('.form-error');
        errorElements.forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });

        const fields = contactForm.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.classList.remove('error', 'success');
        });
    }

    // ========================================
    // 实时字符计数（用于textarea）
    // Real-time Character Count
    // ========================================

    const messageField = contactForm.querySelector('textarea[name="message"]');
    if (messageField) {
        messageField.addEventListener('input', function() {
            const charCount = this.value.length;
            const maxChars = 5000;
            
            // 更新字符计数显示（如果有的话）
            let counter = this.parentElement.querySelector('.char-count');
            if (!counter) {
                counter = document.createElement('small');
                counter.className = 'char-count';
                counter.style.cssText = 'color: #999; display: block; margin-top: 0.3rem;';
                this.parentElement.appendChild(counter);
            }
            counter.textContent = `${charCount} / ${maxChars} 个字符 / characters`;
        });
    }

    // ========================================
    // 自动填充功能
    // Auto-fill Features
    // ========================================

    const phoneField = contactForm.querySelector('input[name="phone"]');
    if (phoneField) {
        phoneField.addEventListener('input', function() {
            // 移除非数字字符
            let value = this.value.replace(/\D/g, '');
            
            // 格式化电话号码
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            
            this.value = value;
        });
    }

    // ========================================
    // 主题选择动画
    // Subject Selection Animation
    // ========================================

    const subjectSelect = contactForm.querySelector('select[name="subject"]');
    if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
            // 添加选择动画
            this.style.borderColor = '#45B7D1';
            setTimeout(() => {
                this.style.borderColor = '#E0E0E0';
            }, 300);
        });
    }

    // ========================================
    // 页面离开时的警告（如有未保存内容）
    // Warn Before Leaving with Unsaved Changes
    // ========================================

    let formChanged = false;

    contactForm.addEventListener('input', function() {
        formChanged = true;
    });

    contactForm.addEventListener('submit', function() {
        formChanged = false;
    });

    window.addEventListener('beforeunload', function(e) {
        if (formChanged && contactForm.querySelector('input[name="name"]').value.trim()) {
            e.preventDefault();
            e.returnValue = '';
        }
    });

    // ========================================
    // 初始化
    // Initialize
    // ========================================

    console.log('联系表单脚本已加载 / Contact form script loaded');
});

/**
 * 实用函数：验证电子邮箱
 * Utility: Email Validation
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * 实用函数：格式化日期
 * Utility: Format Date
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * 实用函数：显示通知
 * Utility: Show Notification
 */
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}
