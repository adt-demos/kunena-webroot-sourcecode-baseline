/**
 * Kunena Component
 * @package Kunena.Template.Aurelia
 *
 * @copyright     Copyright (C) 2008 - 2024 Kunena Team. All rights reserved.
 * @license https://www.gnu.org/copyleft/gpl.html GNU/GPL
 * @link https://www.kunena.org
 **/

jQuery(document).ready(function ($) {

	/* To hide or open spoiler on click */
	$(document).on('click', '.kspoiler-expand', function (e) {
		e.preventDefault()
		const show = $(this.children[0]).val() === Joomla.Text._('COM_KUNENA_LIB_BBCODE_SPOILER_EXPAND');
		$(this.children[0]).val(show ? Joomla.Text._('COM_KUNENA_LIB_BBCODE_SPOILER_HIDE') : Joomla.Text._('COM_KUNENA_LIB_BBCODE_SPOILER_EXPAND'));
		$(this).parent().children('.kspoiler-wrapper').toggle()
	});

	/* To allow to close or open the quick-reply modal box */
	$('.openmodal').click(function () {
		const boxToOpen = $(this).attr('href');
		$(boxToOpen).css('visibility', 'visible');
	});

	/* Button to show more info on profilebox */
	$(".heading").click(function () {
		if (!$(this).hasClass('heading-less')) {
			$(this).prev(".heading").show();
			$(this).hide();
			$(this).next(".content").slideToggle(500);
		}
		else {
			const content = $(this).next(".heading").show();
			$(this).hide();
			content.next(".content").slideToggle(500);
		}
	});

	$('[id^="login-link"]').click(function () {
		$(this).ready(function () {
			if ($('#userdropdown').is(":visible")) {
				$(this).addClass('kdelay');
			}
			else {
				$('#userdropdown').css('display', 'inline-block');
				$('#userdropdown').css('visibility', 'visible').delay(500).queue(function () {
					$(this).addClass('kdelay');
				});
			}
		});
	});

	$(document).click(function () {
		$('.kdelay').css('display', 'none').removeClass('kdelay');
	});

	$('#userdropdown').click(function (e) {
		e.stopPropagation();
	});

	/* On moderate page display subject or field to enter manually the topic ID */
	$('#kmod_topics').change(function () {
		const id_item_selected = $(this).val();

		if (id_item_selected === 0) {
			$('#kmod_subject').hide();
		}
		else {
			$('#kmod_subject').show();
		}

		if (id_item_selected == -1) {
			$('#kmod_targetid').show();
		}
		else {
			$('#kmod_targetid').hide();
		}
	});

	if ($.fn.jsSocials !== undefined) {
		$("#share").jsSocials({
			showCount: true,
			showLabel: true,
			shares: [
				{
					share: "email",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_EMAIL_LABEL')
				},
				{
					share: "twitter",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_X_SOCIAL_LABEL')
				},
				{
					share: "facebook",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_FACEBOOK_LABEL')
				},
				{
					share: "linkedin",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_LINKEDIN_LABEL')
				}, {
					share: "pinterest",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_PINTEREST_LABEL')
				},
				{
					share: "whatsapp",
					label: Joomla.Text._('COM_KUNENA_SOCIAL_WHATSAPP_LABEL')
				}]
		});
		$('.jssocials-share-whatsapp').addClass('visible-xs-block');
	}

	$('#kmod_categories').change(function () {
		$.getJSON(
			kunena_url_ajax, {catid: $(this).val()}
		).done(function (json) {
			const first_item = $('#kmod_topics option:nth-child(0)').clone();
			const second_item = $('#kmod_topics option:nth-child(1)').clone();

			$('#kmod_topics').empty();
			first_item.appendTo('#kmod_topics');
			second_item.appendTo('#kmod_topics');

			$.each(json, function (index, object) {
				$.each(object, function (key, element) {
					$('#kmod_topics').append('<option value="' + element['id'] + '">' + element['subject'] + '</option>');
				});
			});
		})
			.fail(function () {
				//TODO: handle the error of ajax request
			});
	});
});
